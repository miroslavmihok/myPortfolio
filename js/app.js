gsap.registerPlugin(ScrollToPlugin);

// smooth scrolling with lenis

const lenis = new Lenis({
  duration: 1,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

lenis.on("scroll", () => {});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// scrollto

const menuBtns = document.querySelectorAll(".menuBtn");
const homeBtn = document.querySelector(".homepage-btn");

menuBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    let value = e.target.name;
    let currentPage = value.toLowerCase();

    gsap.to(window, { duration: 1, scrollTo: { y: `#${currentPage}-page` } });
  });
});

homeBtn.addEventListener("click", (e) => {
  e.preventDefault();

  gsap.to(window, { duration: 1, scrollTo: { y: "#home-page" } });
});

// onPhone - burger menu btn

const phoneMenuBtn = document.querySelector(".phone-menu-btn");
const phoneMenuSection = document.querySelector(".phone-menu-section");

phoneMenuSection.style.maxHeight = "0px";

phoneMenuBtn.addEventListener("click", () => {
  if (phoneMenuSection.style.maxHeight != "0px") {
    phoneMenuSection.style.maxHeight = "0px";
  } else {
    phoneMenuSection.style.maxHeight = "200px";
  }
});

const phoneMenuBtns = document.querySelectorAll(".phone-menu-section .menuBtn");

phoneMenuBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    phoneMenuSection.style.maxHeight = "0px";
  });
});
