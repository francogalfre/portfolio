const today = new Date();
let age = today.getFullYear() - 2007;

if (today.getMonth() < 1 || (today.getMonth() === 1 && today.getDate() < 22)) {
  age--;
}

export const about = {
  title: "About me",
  paragraph1: `I'm Franco! 🍷 I'm ${age} years old and a passionate developer who loves computing, coding, and coffee. I approach every challenge with enthusiasm and curiosity, always excited to learn new technologies.`,
  paragraph2:
    "I thrive in collaborative environments and enjoy tackling complex problems. Je parle trois langues and play chess in my free time, which helps with strategic thinking and problem-solving.",
};
