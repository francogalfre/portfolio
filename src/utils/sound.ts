let ctx: AudioContext | null = null;

function play(ac: AudioContext) {
    const osc = ac.createOscillator();
    const gain = ac.createGain();

    osc.connect(gain);
    gain.connect(ac.destination);

    osc.type = "sine";
    osc.frequency.value = 480;

    const t = ac.currentTime;

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.03, t + 0.012);
    gain.gain.linearRampToValueAtTime(0, t + 0.06);

    osc.start(t);
    osc.stop(t + 0.06);
}

export function playHover() {
    if (!ctx) ctx = new AudioContext();

    if (ctx.state === "running") {
        play(ctx);
    } else {
        ctx.resume().then(() => play(ctx!));
    }
}
