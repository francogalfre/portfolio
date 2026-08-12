const HOVER_SOUND_URL = "/sounds/hover.mp3";
const HOVER_VOLUME = 0.05;

let ctx: AudioContext | null = null;
let hoverBuffer: AudioBuffer | null = null;
let hoverBufferPromise: Promise<AudioBuffer> | null = null;

function loadHoverBuffer(ac: AudioContext): Promise<AudioBuffer> {
    if (hoverBuffer) return Promise.resolve(hoverBuffer);
    if (!hoverBufferPromise) {
        hoverBufferPromise = fetch(HOVER_SOUND_URL)
            .then((res) => res.arrayBuffer())
            .then((data) => ac.decodeAudioData(data))
            .then((buffer) => {
                hoverBuffer = buffer;
                return buffer;
            });
    }
    return hoverBufferPromise;
}

function play(ac: AudioContext, buffer: AudioBuffer) {
    const source = ac.createBufferSource();
    const gain = ac.createGain();

    source.buffer = buffer;
    source.connect(gain);
    gain.connect(ac.destination);
    gain.gain.value = HOVER_VOLUME;

    source.start();
}

export function playHover() {
    if (!ctx) ctx = new AudioContext();

    const run = () => loadHoverBuffer(ctx!).then((buffer) => play(ctx!, buffer));

    if (ctx.state === "running") {
        run();
    } else {
        ctx.resume().then(run);
    }
}
