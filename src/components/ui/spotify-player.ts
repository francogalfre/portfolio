import type { NowPlayingResponse } from "@/types/spotify";
import { PLAY } from "@/components/icons/play.ts";
import { STOP } from "@/components/icons/stop.ts";

const container = document.getElementById("now-playing")!;

async function load() {
  const res = await fetch("/api/spotify");
  const song = (await res.json()) as NowPlayingResponse;

  if (!song.title) {
    container.innerHTML = `<span class="text-sm text-secondary">nothing recently played</span>`;
    return;
  }

  container.innerHTML = `
    <div class="flex items-center gap-3">
      <img
        src="${song.albumArt}"
        alt="${song.title}"
        class="size-8 rounded-xs shrink-0"
      />
      <div class="flex flex-col gap-1 min-w-0 flex-1">
        <a
          href="${song.songUrl}"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm text-black leading-none truncate hover:text-black/90 hover:underline transition-all"
        >${song.title}</a>
        <span class="text-xs text-secondary leading-none truncate">${song.artist}</span>
      </div>
      ${
        song.previewUrl
          ? `<button id="play-btn" class="shrink-0 text-secondary hover:text-black transition-colors">${PLAY}</button>`
          : `<a href="${song.songUrl}" target="_blank" rel="noopener noreferrer" class="shrink-0 text-xs text-secondary hover:text-black transition-colors">↗</a>`
      }
    </div>
  `;

  if (!song.previewUrl) return;

  const btn = document.getElementById("play-btn")!;
  const audio = new Audio(song.previewUrl);
  audio.volume = 0.2;

  audio.addEventListener("ended", () => {
    btn.innerHTML = PLAY;
  });

  btn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      btn.innerHTML = STOP;
    } else {
      audio.pause();
      audio.currentTime = 0;
      btn.innerHTML = PLAY;
    }
  });
}

load();
