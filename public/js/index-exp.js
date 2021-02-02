let swiper = new Swiper(".swiper-container", {
  effect: "slide",
  parallax: true,
});

const body = document.querySelector("body");
const form = document.querySelector("#form");
const formSliderTrack = document.querySelector("form .slider-track");
const formNextBtn = document.querySelector(".form__next-btn");
const formPrevBtn = document.querySelector(".form__prev-btn");
const burgerBtn = document.querySelector(".burger");
const menuPage = document.querySelector(".menu-page");
const aboutUsBtn = document.querySelector("#aboutUs");
const aboutUsPage = document.querySelector(".about-us");
const menuFeedbackPage = document.querySelector(".menu-page .feedback-page");
const menuOpenFeedbackBtn = document.querySelector("#feedback");
const menuPagePartTop = document.querySelector(".menu-page__part-top");
const menuPagePartBottom = document.querySelector(".menu-page__part-bottom");
const returnBtn = document.querySelector(".return-btn");
const sliderTrackFruits = document.querySelector(".slider-track--fruits");
const sliderContainerFruits = document.querySelector(
  ".slider-container--fruits"
);

const classes = {
  0: "apple",
  1: "tomato",
  2: "appleCitrus",
  3: "multiMix",
};
const sections = {
  0: document.querySelector(".apple"),
  1: document.querySelector(".tomato"),
  2: document.querySelector(".appleCitrus"),
  3: document.querySelector(".multiMix"),
};

let homePageHeight;
let isAboutUsPageOpen = false;
let isFeedbackPageOpen = false;
let isMenuPageOpen = false;

// ----------------< buttons onClick events handlers >--------------
function aboutUsBtnHandler() {
  burgerBtn.classList.add("burger--rotate");
  menuPagePartTop.classList.add("menu-page__part-top--active");
  menuPagePartBottom.classList.add("menu-page__part-bottom--active");
  aboutUsPage.classList.add("about-us--active");
  menuOpenFeedbackBtn.classList.remove("feedback--active");
  isAboutUsPageOpen = true;
}

function menuOpenFeedbackBtnHandler() {
  burgerBtn.classList.add("burger--rotate");
  menuPagePartTop.classList.add("menu-page__part-top--active");
  menuPagePartBottom.classList.add("menu-page__part-bottom--active");
  menuOpenFeedbackBtn.classList.add("feedback--active");
  aboutUsPage.classList.remove("about-us--active");
  isFeedbackPageOpen = true;
}

function burgerBtnHandler() {
  if (isAboutUsPageOpen || isFeedbackPageOpen) {
    burgerBtn.classList.remove("burger--rotate");
    menuPagePartTop.classList.remove("menu-page__part-top--active");
    menuPagePartBottom.classList.remove("menu-page__part-bottom--active");
    isAboutUsPageOpen = false;
    isFeedbackPageOpen = false;
  } else {
    isMenuPageOpen = !isMenuPageOpen;
    body.classList.toggle("prevent-scrolling");
    menuPage.classList.toggle("menu-page--active");
    burgerBtn.classList.toggle("burger--active");

    if (isMenuPageOpen) {
      addFormToMenuPage();
    } else {
      addFormToSection();
    }
  }
}

function returnBtnHandler() {
  window.scroll(0, 0);
}

function formNextBtnHandler() {
  formSliderTrack.classList.add("slider-track--translate");
}
function formPrevBtnHandler() {
  formSliderTrack.classList.remove("slider-track--translate");
}
// ----------------</ buttons onClick events handlers >--------------

//-----< swiper slideChange event listeners >---------------

function changeMenuPageColor() {
  let { activeIndex, previousIndex } = swiper;
  if (previousIndex !== undefined) {
    menuPage.classList.remove(`menu-page--${classes[previousIndex]}`);
    menuFeedbackPage.classList.remove(`feedback--${classes[previousIndex]}`);
  }
  menuPage.classList.add(`menu-page--${classes[activeIndex]}`);
  menuFeedbackPage.classList.add(`feedback--${classes[activeIndex]}`);
}

function sliderTrackFruitsTranslate() {
  let index = swiper.activeIndex;
  sliderTrackFruits.style.transform = `translate3d(${-index * 100 + "%"},0,0)`;
  sliderContainerFruits.style.height = sections[index].offsetHeight + "px";
}

//-----</ swiper slideChange event listeners >---------------

function preventSlideChanges() {
  if (window.scrollY > 30) swiper.allowTouchMove = false;
  else swiper.allowTouchMove = true;
}

function toggleReturnBtnActivity() {
  let index = swiper.activeIndex;
  let className = `return-btn--${classes[index]}`;
  if (window.scrollY > homePageHeight) returnBtn.classList.add(className);
  else returnBtn.classList.remove(className);
}

//---------------< initialize onClick events handlers >-----------------
burgerBtn.onclick = burgerBtnHandler;
aboutUsBtn.onclick = aboutUsBtnHandler;
menuOpenFeedbackBtn.onclick = menuOpenFeedbackBtnHandler;
returnBtn.onclick = returnBtnHandler;
formNextBtn.onclick = formNextBtnHandler;
formPrevBtn.onclick = formPrevBtnHandler;
//---------------</ initialize onClick events handlers >-----------------

function init() {
  homePageHeight = document.querySelector(".home-page").offsetHeight;
  sliderTrackFruitsTranslate();
  changeMenuPageColor();
  addFormToSection();

  swiper.on("slideChange", () => {
    Promise.resolve(
      sliderTrackFruitsTranslate(),
      changeMenuPageColor(),
      addFormToSection()
    );
  });
}

function addFormToSection() {
  let index = swiper.activeIndex;
  let container = document.querySelector(`.${classes[index]} .form-container`);
  container.appendChild(form);
}

function addFormToMenuPage() {
  let container = document.querySelector(".menu-page .form-container");
  container.appendChild(form);
}

window.addEventListener("load", init, false);
//window.addEventListener("resize", init, false);
window.addEventListener(
  "scroll",
  () => {
    preventSlideChanges();
    toggleReturnBtnActivity();
  },
  false
);
