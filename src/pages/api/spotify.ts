export const prerender = false;

import type { APIRoute } from "astro";
import type {
	RecentlyPlayedResponse,
	NowPlayingResponse,
	Artist,
} from "@/types/spotify";

const CLIENT_ID = import.meta.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = import.meta.env.SPOTIFY_REFRESH_TOKEN;

async function getAccessToken(): Promise<string> {
	const res = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: {
			Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			grant_type: "refresh_token",
			refresh_token: REFRESH_TOKEN,
		}),
	});

	const data = await res.json();
	return data.access_token as string;
}

async function getRecentlyPlayed(
	token: string,
): Promise<RecentlyPlayedResponse> {
	const res = await fetch(
		"https://api.spotify.com/v1/me/player/recently-played?limit=1&market=US",
		{ headers: { Authorization: `Bearer ${token}` } },
	);
	return res.json();
}
async function getSongPreview(
	title: string,
	artist: string,
): Promise<string | null> {
	const query = encodeURIComponent(`${title} ${artist}`);
	const res = await fetch(`https://api.deezer.com/search?q=${query}&limit=1`);
	const data = await res.json();

	return data.data?.[0]?.preview ?? null;
}

export const GET: APIRoute = async () => {
	const token = await getAccessToken();
	const data = await getRecentlyPlayed(token);
	const track = data.items?.[0]?.track;

	if (!track) {
		return Response.json({ title: null } satisfies Partial<NowPlayingResponse>);
	}

	const artist = track.artists.map((a) => a.name).join(", ");
	const previewUrl =
		track.preview_url ?? (await getSongPreview(track.name, artist));

	const response: NowPlayingResponse = {
		title: track.name,
		artist: track.artists.map((a: Artist) => a.name).join(", "),
		albumArt: track.album.images[0]?.url ?? null,
		songUrl: track.external_urls.spotify,
		trackId: track.id,
		previewUrl: previewUrl,
	};

	return Response.json(response);
};
