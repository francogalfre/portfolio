import type { NowPlayingResponse } from "@/types/spotify";

const PLAY = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" />
  </svg>
`;

const STOP = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M17 4h-10a3 3 0 0 0 -3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3 -3v-10a3 3 0 0 0 -3 -3z" />
  </svg>
`;

const ARROW_UP_RIGHT = `
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
  </svg>
`;

let audio: HTMLAudioElement | undefined;

async function load() {
    const container = document.getElementById("now-playing");
    if (!container) return;
    let song: NowPlayingResponse;
    try {
        const res = await fetch("/api/spotify");
        if (!res.ok) throw new Error(String(res.status));
        song = (await res.json()) as NowPlayingResponse;
    } catch {
        container.innerHTML = `<span class="text-sm text-secondary">nothing recently played</span>`;
        return;
    }

    if (!song.title) {
        container.innerHTML = `<span class="text-sm text-secondary">nothing recently played</span>`;
        return;
    }

    // During the intro, keep the skeleton until this block's reveal has started
    const t = parseFloat(container.parentElement?.style.getPropertyValue("--t") ?? "");
    if (document.documentElement.classList.contains("intro") && !Number.isNaN(t)) {
        const wait = (t + 0.5) * 1000 - performance.now();
        if (wait > 0) await new Promise((r) => setTimeout(r, wait));
    }

    container.innerHTML = `
    <div class="flex items-center gap-3">
      <img
        style="--k:0"
        src="${song.albumArt}"
        alt=""
        width="32"
        height="32"
        decoding="async"
        class="np-item size-8 rounded-xs shrink-0"
      />
      <div style="--k:1" class="np-item flex flex-col gap-1.5 min-w-0 flex-1">
        <a
          href="${song.songUrl}"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm text-black leading-none truncate hover:text-black/90 hover:underline transition-all w-fit"
        >${song.title}</a>
        <span class="text-xs text-secondary leading-none truncate">${song.artist}</span>
      </div>
      ${song.previewUrl
            ? `<button id="play-btn" style="--k:2" type="button" aria-label="Play preview" class="np-item shrink-0 text-secondary hover:text-black transition-colors">${PLAY}</button>`
            : `<a href="${song.songUrl}" target="_blank" rel="noopener noreferrer" aria-label="Open in Spotify" style="--k:2" class="np-item shrink-0 text-secondary hover:text-black transition-colors">${ARROW_UP_RIGHT}</a>`
        }
    </div>
  `;

    if (!song.previewUrl) return;

    const btn = document.getElementById("play-btn")!;
    const track = new Audio(song.previewUrl);
    audio = track;
    track.volume = 0.2;

    track.addEventListener("ended", () => {
        btn.innerHTML = PLAY;
    });

    btn.addEventListener("click", () => {
        if (track.paused) {
            track.play();
            btn.innerHTML = STOP;
        } else {
            track.pause();
            track.currentTime = 0;
            btn.innerHTML = PLAY;
        }
    });
}

document.addEventListener("astro:page-load", load);
document.addEventListener("astro:before-swap", () => {
    audio?.pause();
    audio = undefined;
});
