// Particles
window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("particles-canvas");
  const ctx = canvas.getContext("2d");
  let width, height;

  const particlesArray = [];
  const numParticles = 240;

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = Math.random() * 1 + 0.3;
      this.speedY = Math.random() * 0.3 + 0.1;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.angle = Math.random() * Math.PI * 2;
      this.angleSpeed = (Math.random() - 0.5) * 0.02;
    }
    update() {
      this.y += this.speedY;
      this.x += Math.sin(this.angle) * this.speedX;
      this.angle += this.angleSpeed;

      if (this.y > height) this.y = 0;
      if (this.x > width) this.x = 0;
      if (this.x < 0) this.x = width;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.fill();
    }
  }

  function createParticles() {
    particlesArray.length = 0;
    for (let i = 0; i < numParticles; i++) {
      particlesArray.push(new Particle());
    }
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    createParticles();
  }

  window.addEventListener("resize", resize);
  resize();

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (const p of particlesArray) {
      p.update();
      p.draw();
    }

    requestAnimationFrame(animate);
  }

  animate();
});

// SCROLL

const progressBar = document.querySelector(".scroll-progress-bar");
const progressFill = document.querySelector(".scroll-progress-fill");

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollTop / scrollHeight;
  progressFill.style.height = `${progress * 100}%`;
}

window.addEventListener("scroll", updateScrollProgress);
window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();

const goHomeButton = document.querySelector(".go-home");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    goHomeButton.classList.add("visible");
  } else {
    goHomeButton.classList.remove("visible");
  }
});


// MENU

const sections = ["home", "skills", "projects", "footer"];
const menu = document.querySelector(".menu");
const bubble = document.querySelector(".bubble");
const links = Array.from(menu.querySelectorAll("a"));

function updateBubblePosition() {
  let currentIndex = 0;

  sections.forEach((id, i) => {
    const section = document.getElementById(id);
    if (section) {
      const rect = section.getBoundingClientRect();
      if (
        rect.top <= window.innerHeight / 2 &&
        rect.bottom >= window.innerHeight / 2
      ) {
        currentIndex = i;
      }
    }
  });
links.forEach(link => link.classList.remove("active"));
  const activeLink = links[currentIndex];
  if (activeLink) {
    activeLink.classList.add("active");
  }
  
  if (activeLink) {
    const linkRect = activeLink.getBoundingClientRect();
    const menuRect = menu.getBoundingClientRect();

    const bubbleX = linkRect.left - menuRect.left + linkRect.width / 2 - 35;
    bubble.style.left = `${bubbleX}px`;
  }
}

window.addEventListener("scroll", updateBubblePosition);
window.addEventListener("load", updateBubblePosition);
window.addEventListener("resize", updateBubblePosition);

// CAT
let popupOpen = false;
const element = document.querySelector(".cat_head");
let currentAngle = 0;
let targetAngle = 0;

document.addEventListener("mousemove", (e) => {
  if (popupOpen) return;
  if (popupOpen) targetAngle = 0;
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const dx = e.clientX - centerX;
  const dy = e.clientY - centerY;

  let radians = Math.atan2(dx, dy);
  let deg = radians * (180 / Math.PI) * -1 + 180;
  let relativeAngle = deg - 180;

  const minAngle = -90;
  const maxAngle = 90;
  targetAngle = Math.max(minAngle, Math.min(maxAngle, relativeAngle));
});

function animate() {
  currentAngle += (targetAngle - currentAngle) * 0.1;

  element.style.transform = `translateY(109px) rotate(${currentAngle}deg)`;

  requestAnimationFrame(animate);
}
animate();

// DARK MODE
const toggleBtn = document.getElementById("themeToggle");
toggleBtn.addEventListener("click", (e) => {
  e.preventDefault();
  document.documentElement.classList.toggle("dark");
});
document.getElementById("themeToggle").addEventListener("click", (e) => {
  e.preventDefault();
  document.body.classList.toggle("dark");
});

function onEntry(entry) {
  entry.forEach(change => {
    if (change.isIntersecting) {
     change.target.classList.add('element-show');
    }
  });
}

let options = {
  threshold: [0.5] };
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.element-animation');

for (let elm of elements) {
  observer.observe(elm);
}

//Hire me popup

// $(function () {

//   function openPopup() {
//     $('.popup-overlay').fadeIn(200);
//     $('.popup').fadeIn(200);
//     $('body').addClass('no-scroll');
//     popupOpen = true;
//   }

//   function closePopup() {
//     $('.popup-overlay').fadeOut(200);
//     $('.popup').fadeOut(200);
//     $('body').removeClass('no-scroll');
//     popupOpen = false;
//   }

//   $('.open-modal-btn').on('click', openPopup);
//   $('.js-close-popup, .popup-overlay').on('click', closePopup);

//   $(document).on('keyup', function(e) {
//     if (e.key === "Escape") closePopup();
//   });

// });
