/*


// Project-Website-neu.js
// =====================================================
// 1) Texte je Spalte – in DOM-Reihenfolge:
const leftTexts = [
  {
    title: "Project collection",
    body: "This project marked my first step into building web tools and provided a solid introduction to HTML, CSS, and JavaScript. It gave me the foundation to continue experimenting, and now I’m able to showcase a range of additional projects created with these technologies."
  },
  { title: "Axolotl Rescue", body: "Together with a group from university, I developed an educational game designed to illustrate fundamental concepts of computer science. It covers topics such as binary numbers, circuits, encryption, breadth- and depth-first search, and shortest path algorithms—all woven into an engaging and story-driven experience." },
  { title: "Dresden Half", body: "In this project, I produced a route animation for the 2023 Dresden Half marathon—combining design and storytelling in a visually engaging way." },
  { title: "ATN", body: "The ATN promotional animation spanned several months with multiple complex animations to explain mechanical processes." },
];

const rightTexts = [
  {
    title: "Albion Guide",
    body: "A passion project: a website with tools for the MMORPG Albion Online (market tracker, trading utilities, island calculator, tips). It sparked lots of ideas to explore."
  },
  { title: "Progress Station", body: "Edited a dynamic trailer highlighting a major update for an idle game released by friends." },
  { title: "NSS MIC", body: "Provided remote support for the Nuclear Science Symposium and Medical Imaging Conference in Vancouver." },
  { title: "M.S.T.N", body: "My first independent project: filming, music selection and editing for the MIT.SUMMER.TRACK.NIGHT in Dresden." },
];
// =====================================================

function ensureCard(projectEl){
  let card = projectEl.querySelector('.card');
  if (!card){
    card = document.createElement('div');
    card.className = 'card';
    while (projectEl.firstChild) card.appendChild(projectEl.firstChild);
    projectEl.appendChild(card);
    card.style.display = 'block';
  }
  return card;
}

function ensureMediaRow(cardEl){
  let mediaRow = cardEl.querySelector('.media-row');
  if (!mediaRow){
    mediaRow = document.createElement('div');
    mediaRow.className = 'media-row';
    const desc = cardEl.querySelector('.project-describption');
    if (desc){ cardEl.insertBefore(mediaRow, desc); } else { cardEl.appendChild(mediaRow); }
    const img = cardEl.querySelector('img.pic');
    if (img) mediaRow.appendChild(img);
  }
  return mediaRow;
}

// Overlay-Text Markup sicher bauen (keine losen Tags)
function createHoverText({title, body}){
  const el = document.createElement('div');
  el.className = 'hover-text';
  // Inhalt
  const h = document.createElement('p');
  h.className = 'hover-title';
  h.textContent = title || "";
  const p = document.createElement('p');
  p.className = 'hover-body';
  p.textContent = body || "";
  el.append(h, p);
  return el;
}

function placeHoverText({ side, card, mediaRow, img, hoverText }){
  const timeline = document.querySelector('.timeline');
  if (!timeline || !img) return;

  const gap = 12;
  const wantWidth = Math.min(Math.max(window.innerWidth * 0.36, 280), 600); // clamp(280px,36vw,600px)

  const imgRect = img.getBoundingClientRect();
  const tlRect  = timeline.getBoundingClientRect();

  const spaceInner = (side === 'left')
    ? (tlRect.left - imgRect.right - gap)
    : (imgRect.left - tlRect.right - gap);

  const panelW = Math.max(0, Math.min(wantWidth + gap, Math.abs(spaceInner)));

  // Panel hinterlegen
  card.classList.add('with-panel');
  card.style.setProperty('--panel-w', panelW + 'px');

  // Position (innen = zur Timeline; sonst nach außen)
  hoverText.style.top = '50%';
  hoverText.style.transform = 'translateY(-50%)';

  if (side === 'left'){
    if (spaceInner >= wantWidth){
      hoverText.style.left = (img.offsetLeft + img.offsetWidth + gap) + 'px';
      hoverText.style.right = 'auto';
    } else {
      hoverText.style.right = (mediaRow.offsetWidth - img.offsetLeft + gap) + 'px';
      hoverText.style.left = 'auto';
    }
  } else {
    if (spaceInner >= wantWidth){
      hoverText.style.right = (mediaRow.offsetWidth - img.offsetLeft + gap) + 'px';
      hoverText.style.left = 'auto';
    } else {
      hoverText.style.left = (img.offsetLeft + img.offsetWidth + gap) + 'px';
      hoverText.style.right = 'auto';
    }
  }

  requestAnimationFrame(() => { hoverText.style.opacity = '1'; });
}

function attachLazyHover(projectEl, side, textObj){
  if (!textObj) return;

  const onFirstHover = () => {
    const card     = ensureCard(projectEl);
    const mediaRow = ensureMediaRow(card);
    const img      = mediaRow.querySelector('img.pic');
    if (!img) return;

    const hoverText = createHoverText(textObj);
    card.appendChild(hoverText);            // Text in die Card (über Panel)
    placeHoverText({ side, card, mediaRow, img, hoverText });

    const onResize = () => placeHoverText({ side, card, mediaRow, img, hoverText });
    window.addEventListener('resize', onResize);

    projectEl.removeEventListener('mouseenter', onFirstHover);
  };

  projectEl.addEventListener('mouseenter', onFirstHover, { once: true });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.left .project') .forEach((proj, i) => attachLazyHover(proj, 'left',  leftTexts[i]));
  document.querySelectorAll('.right .project').forEach((proj, i) => attachLazyHover(proj, 'right', rightTexts[i]));
});


*/