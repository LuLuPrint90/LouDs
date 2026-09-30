const speakerNotes = [
  "Presentate y presentá la marca. Idea: no vengo a mostrar un logo, sino un perfil que se está construyendo. Mencioná que parte de la Parte 2 de la materia.",
  "Explicá el nombre: Lou (yo), D (desarrollo), S (software). 'A medida' = adaptar la solución a cada persona o emprendimiento, no al revés.",
  "El texto plantea que el mercado cambia (digitalización, demografía, transición ecológica). Eso exige competencias nuevas, perfiles híbridos y aprender siempre.",
  "Leé la frase de propósito. Insistí en 'necesidades reales': la tecnología es el medio, no el fin.",
  "Mi perfil combina persona, creatividad (diseño), lógica (desarrollo), tecnología (software) y evolución (aprendizaje permanente). LouDS es el punto donde se unen.",
  "Sé honesta con los dos estados: punto lleno = competencia que ya uso; anillo = la sigo desarrollando. Ese contraste muestra criterio, no debilidad.",
  "Mi proceso real: aprender en los estudios, practicar en proyectos académicos, crear en LuLú PRINT, equivocarme, mejorar y adaptarme. Es un ciclo, no una línea.",
  "Cuatro experiencias distintas construyen un solo perfil. Contá brevemente qué aprendí de LuLú PRINT: diseño, organización y atender necesidades reales.",
  "Mi diferencial: entender antes de programar. Marcá que las dos primeras etapas (necesidad y análisis) son las que evitan construir la solución equivocada.",
  "Estas son áreas de interés y proyección, no servicios que ya ofrezco. Decí hacia dónde quiero crecer.",
  "Conectá con la materia: transformación exige competencias; competencias permiten adaptarse; aprender siempre lleva a la resiliencia profesional. La barra queda sin completar a propósito.",
  "Cerrá con la frase final y el eslogan. Silencio de un segundo con el logo en pantalla. Gracias."
];

const slides = [...document.querySelectorAll('.s')];
const stage = document.getElementById('st');
const notes = document.getElementById('nt');
let currentSlide = 0;

slides.forEach((slide, index) => {
  if (index > 0) {
    slide.insertAdjacentHTML(
      'beforeend',
      `<div class="foot lg">Lou<b>DS</b></div><div class="pg">${index + 1} / ${slides.length}</div>`
    );
  }
});

function fitStage() {
  const scale = Math.min(innerWidth / 1920, innerHeight / 1080);
  stage.style.transform = `scale(${scale})`;
  stage.style.left = `${(innerWidth - 1920 * scale) / 2}px`;
  stage.style.top = `${(innerHeight - 1080 * scale) / 2}px`;
}

function showSlide(index) {
  currentSlide = Math.max(0, Math.min(slides.length - 1, index));
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle('on', slideIndex === currentSlide);
  });
  notes.textContent = speakerNotes[currentSlide];
  location.hash = currentSlide + 1;
}

addEventListener('resize', fitStage);
fitStage();

addEventListener('keydown', (event) => {
  if (['ArrowRight', 'ArrowDown', ' ', 'PageDown'].includes(event.key)) {
    showSlide(currentSlide + 1);
  } else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(event.key)) {
    showSlide(currentSlide - 1);
  } else if (event.key === 'n' || event.key === 'N') {
    notes.style.display = notes.style.display === 'block' ? 'none' : 'block';
  } else if (event.key === 'f' || event.key === 'F') {
    try {
      document.fullscreenElement
        ? document.exitFullscreen()
        : document.documentElement.requestFullscreen();
    } catch (error) {
      // El modo pantalla completa puede no estar disponible en todos los navegadores.
    }
  }
});

addEventListener('click', (event) => {
  showSlide(currentSlide + (event.clientX > innerWidth / 2 ? 1 : -1));
});

showSlide((parseInt(location.hash.slice(1), 10) || 1) - 1);
