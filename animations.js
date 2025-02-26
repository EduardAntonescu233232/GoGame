import { gsap } from "gsap";

const titleElement = document.querySelector('.title');
const text = titleElement.textContent;
titleElement.innerHTML = '';

text.split('').forEach(char => {
    const span = document.createElement('span');
    span.classList.add('char');
    span.textContent = char === ' ' ? '\u00A0' : char;
    titleElement.appendChild(span);
})

const descriptionElement = document.querySelector('.main-description');
let descText = descriptionElement.textContent;
descText = descText.replace(/\s+/g, ' ').trim();
descriptionElement.innerHTML = '';

const words = descText.split(' ');
words.forEach((word, index) => {
  const span = document.createElement('span');
  span.classList.add('word');
  span.textContent = word;
  descriptionElement.appendChild(span);
  if (index < words.length - 1) {
    descriptionElement.appendChild(document.createTextNode(' '));
  }
});

/* #################### Animation timeline ######################*/
gsap.fromTo(
  '.title .char',
  { x: 0, y: "8rem", opacity: 0 },
  { x: 0, y: 0, opacity: 1, duration: 1, ease: 'power4', stagger: 0.1 }
);

gsap.fromTo(
".title-underline",
{ width: 0 },
{ width: "100%", duration: 1.5, ease: "power1.inOut" },
"+=0.1"
);

gsap.fromTo(
'.title',
{ x: "10rem", y: 0},
{ x: 0, y: 0, duration: 1, ease: "power1.inOut"},
"+=0.1"
);

gsap.fromTo(
  '.row1, .row2, .row3', 
  { width: 0},
  { width: "100%", duration: 0.5, ease: "power2.inOut", stagger: 0.1},
  "+=0.01"
);

gsap.fromTo(
  '.col1, .col2, .col3', 
  { height: 0},
  { height: "100%", duration: 0.5, ease: "power1.inOut", stagger: 0.1},
  "+=0.01"
);

gsap.fromTo(
  '.board-stone1, .board-stone2',
  { scale: 0},
  { scale: 1, duration: 0.5, ease: "circ.out"},
  "+=0.1"
);

gsap.fromTo(
    '.main-description .word',
    { x: 0, y: "3rem", opacity: 0 },
    { x: 0, y: 0, opacity: 1, duration: 0.2, ease: 'power4', stagger: 0.1 }
);
