let swiper = new Swiper(".swiper-container", {
  effect: "slide",
  parallax: true,
});

//for testing temporary
function info() {
  let homePage = document.querySelector(".home-page");
  let HPclientHeight = homePage.clientHeight;
  let HPoffsetHeight = homePage.offsetHeight;
  const el = (sel) => document.createElement(sel);

  let d = el("div");
  d.style.height = "100vh";
  document.body.append(d);
  console.log(d.offsetHeight);
  d.remove();

  let infoBlock = el("div");
  infoBlock.style.position = "fixed";
  infoBlock.style.top = "100px";
  infoBlock.style.left = "100px";
  infoBlock.style.zIndex = 99999;
  infoBlock.style.background = "lightgray";

  let pageYOffset = el("h2");
  pageYOffset.innerHTML = `pageYOffset : ${window.pageYOffset}`;

  let innerHeight = el("h2");
  innerHeight.innerHTML = `innerHeight : ${window.innerHeight}`;

  let outerHeight = el("h2");
  outerHeight.innerHTML = `outerHeight : ${window.outerHeight}`;

  let screenHeight = el("h2");
  screenHeight.innerHTML = `screenHeight : ${window.screen.height}`;

  let visualViewport = el("h2");
  visualViewport.innerHTML = `visualViewport : ${window.visualViewport.height}`;

  let HP = el("h2");
  HP.innerHTML = `<br>clientHeight : ${HPclientHeight} <br>offsetHeight : ${HPoffsetHeight}`;

  infoBlock.append(
    pageYOffset,
    innerHeight,
    outerHeight,
    screenHeight,
    visualViewport,
    HP
  );
  document.body.append(infoBlock);
}
info();
window.addEventListener("resize", info);
//----------------------

const body = document.querySelector("body");
const swiperContainer = document.querySelector(".swiper-container");
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

const colors = {
  0: "#8bd2b8",
  1: "#e7524c",
  2: "#fa7d3c",
  3: "#feca57",
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

function changeSwiperContainerBg() {
  let index = swiper.activeIndex;
  swiperContainer.style.backgroundColor = colors[index];
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
  changeSwiperContainerBg();
  swiper.on("slideChange", () => {
    Promise.resolve(
      sliderTrackFruitsTranslate(),
      changeMenuPageColor(),
      addFormToSection(),
      changeSwiperContainerBg()
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
