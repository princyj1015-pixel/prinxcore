// ---------- 1. typing roles in the hero ----------
const roles = ["Learning Python 🐍", "Learn with purpose.", "Build with passion.", "Grow beyond limits. 🚀"];
const typed = document.getElementById("typed");
let r = 0, ch = 0, erasing = false;
(function type() {
  const word = roles[r];
  typed.textContent = word.slice(0, ch);
  if (!erasing && ch < word.length) { ch++; setTimeout(type, 85); }
  else if (!erasing) { erasing = true; setTimeout(type, 1400); }
  else if (ch > 0) { ch--; setTimeout(type, 40); }
  else { erasing = false; r = (r + 1) % roles.length; setTimeout(type, 300); }
})();

// ---------- 2. run the Python code ----------
const output = document.getElementById("output");
let running = false;
function runCode() {
  if (running) return;
  running = true;
  output.textContent = "";
  const lines = ["> Learning Python", "> Learning DSA", "> Learning Web", "✔ Princy is growing every day 🌱"];
  lines.forEach((line, i) => {
    setTimeout(() => {
      output.innerHTML += line + "<br>";
      if (i === lines.length - 1) running = false;
    }, 500 * (i + 1));
  });
}
document.getElementById("run").addEventListener("click", runCode);
setTimeout(runCode, 3600); // auto-run once after the code appears

// ---------- 3. floating code symbols ----------
const floaters = document.getElementById("floaters");
const symbols = ["{ }", "</>", "( )", "py", "01", "=>", "[ ]", "✦", "AI", "#"];
function spawn() {
  const s = document.createElement("span");
  s.className = "floater";
  s.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  s.style.left = Math.random() * 100 + "vw";
  s.style.animationDuration = 12 + Math.random() * 12 + "s";
  s.style.color = ["#c4a2ff", "#ffb892", "#93e8cf", "#ff9ec7"][Math.floor(Math.random() * 4)];
  floaters.appendChild(s);
  setTimeout(() => s.remove(), 25000);
}
setInterval(spawn, 1800);
for (let i = 0; i < 6; i++) spawn();

// ---------- 4. mouse glow + scroll progress ----------
const glow = document.getElementById("glow");
window.addEventListener("pointermove", e => { glow.style.left = e.clientX + "px"; glow.style.top = e.clientY + "px"; });
const bar = document.getElementById("progress");
window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  bar.style.width = (scrollY / max) * 100 + "%";
});

// ---------- 5. reveal sections on scroll ----------
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("show"); io.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// ---------- 6. skill chips ----------
const skillMsg = document.getElementById("skillMsg");
const skillText = {
  "Python": ">>> print('Learning Python every day!')",
  "Problem-solving": ">>> think(); break_it_down(); solve()",
  "Web development basics": "<h1>Hello, I'm building the web 🌐</h1>"
};
document.querySelectorAll(".chip").forEach(chip => {
  chip.addEventListener("click", () => {
    const key = Object.keys(skillText).find(k => chip.textContent.includes(k));
    skillMsg.textContent = skillText[key];
    burst(chip.getBoundingClientRect().left + 30, chip.getBoundingClientRect().top, ["🐍", "✨", "💜"]);
  });
});

// ---------- 7. flip goal cards ----------
document.querySelectorAll(".flip").forEach(card => {
  card.addEventListener("click", () => card.classList.toggle("on"));
});

// ---------- 8. success quotes ----------
const quotes = [
  { t: "Learn with purpose. Build with passion. Grow beyond limits.", a: "Princy" },
  { t: "Dream, dream, dream. Dreams transform into thoughts, and thoughts result in action.", a: "Dr. A. P. J. Abdul Kalam" },
  { t: "The only way to do great work is to love what you do.", a: "Steve Jobs" },
  { t: "Arise, awake, and stop not till the goal is reached.", a: "Swami Vivekananda" },
  { t: "Whether you think you can, or you think you can't, you're right.", a: "Henry Ford" },
  { t: "Everyone should learn to program a computer, because it teaches you how to think.", a: "Steve Jobs" },
  { t: "Dream big, learn fearlessly, and build something worth remembering.", a: "Princy" }
];
const card = document.getElementById("quoteCard");
const qText = document.getElementById("quoteText");
const qAuthor = document.getElementById("quoteAuthor");
let q = 0;
function showQuote() { qText.textContent = quotes[q].t; qAuthor.textContent = "— " + quotes[q].a; }
function nextQuote(fromClick) {
  card.classList.add("out");
  setTimeout(() => { q = (q + 1) % quotes.length; showQuote(); card.classList.remove("out"); }, 350);
  if (fromClick) { const b = document.getElementById("newQuote").getBoundingClientRect(); burst(b.left + b.width / 2, b.top, ["✨", "🌟", "💜", "🎉"]); }
}
document.getElementById("newQuote").addEventListener("click", () => nextQuote(true));
setInterval(() => nextQuote(false), 9000);
showQuote();

// ---------- 9. little emoji burst ----------
function burst(x, y, emojis) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  for (let i = 0; i < 12; i++) {
    const p = document.createElement("span");
    p.className = "pop";
    p.textContent = emojis[i % emojis.length];
    p.style.left = x + "px"; p.style.top = y + "px";
    document.body.appendChild(p);
    const a = Math.random() * Math.PI * 2, d = 60 + Math.random() * 90;
    p.animate([
      { transform: "translate(0,0) scale(1)", opacity: 1 },
      { transform: `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d - 40}px) scale(.4)`, opacity: 0 }
    ], { duration: 900 + Math.random() * 500, easing: "ease-out" }).onfinish = () => p.remove();
  }
}
