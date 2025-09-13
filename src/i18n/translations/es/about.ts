const today = new Date();
let age = today.getFullYear() - 2007;

if (today.getMonth() < 1 || (today.getMonth() === 1 && today.getDate() < 22)) {
  age--;
}

export const about = {
  title: "Sobre mi",
  paragraph1: `Soy Franco! 🍷 Tengo ${age} años y soy un desarrollador apasionado al que le encantan la informática, la programación y el café. Enfrento cada desafío con entusiasmo y curiosidad, siempre con ganas de aprender nuevas tecnologías.`,
  paragraph2:
    "Me desenvuelvo muy bien en entornos colaborativos y disfruto resolver problemas complejos. Hablo tres idiomas y juego al ajedrez en mi tiempo libre, lo que me ayuda con el pensamiento estratégico y la resolución de problemas.",
};
