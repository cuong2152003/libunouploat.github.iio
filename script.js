"use trick";
const btnClose = document.querySelector(".btn-close");
const btnOpen = document.querySelector(".btn-open");
const main = document.querySelector(".main");
const header = document.querySelector(".header");

const about = document.querySelector(".about");

const img = document.querySelectorAll(".slide-img");
const dotContainer = document.querySelector(".dot-content");
const dot = document.querySelectorAll(".dot");
const contentText = document.querySelectorAll(".content-text");

const btnLeft = document.querySelector(".left");
const btnRight = document.querySelector(".right");
const section2 = document.querySelector(".section-2");
const section3 = document.querySelector(".section-3");
const footer = document.querySelector(".footer");
const btnMenu = document.querySelector(".btn-menu");
const btnClose2 = document.querySelector(".btn-close2");

btnMenu.addEventListener("click", function (e) {
  document.querySelector(".header__nav").classList.add("nav-open");
  btnMenu.classList.toggle("hidden");
  btnClose2.classList.toggle("hidden");
});
btnClose2.addEventListener("click", function () {
  document.querySelector(".header__nav").classList.remove("nav-open");
  btnClose2.classList.toggle("hidden");
  btnMenu.classList.toggle("hidden");
});

const box = document
  .querySelectorAll(".box")
  .forEach((e) => e.classList.add("hintder"));
const card = document
  .querySelectorAll(".card")
  .forEach((e) => e.classList.add("hintder"));

btnClose.addEventListener("click", function () {
  main.style.transform = "translateY(-4.8rem)";
  btnClose.classList.add("hidden");
  btnOpen.classList.remove("hidden");
  header.style.transform = "translateY(-100%)";
});

btnOpen.addEventListener("click", function () {
  main.style.transform = "translateY(0)";
  btnOpen.classList.add("hidden");
  btnClose.classList.remove("hidden");
  header.style.transform = "translateY(0%)";
});

about.addEventListener("click", function () {
  document.querySelector(".about-list").classList.toggle("about-list-open");
});

function dotActive(x) {
  document.querySelectorAll(".dot").forEach((e, i) => {
    e.classList.remove("dot-active");

    if (i == x) {
      e.classList.add("dot-active");
    }
  });
}

function goToSlide(x) {
  img.forEach((e, i) => {
    e.style.transform = `translateX(${i - x}00%)`;
    if (i - x != 0) {
      e.classList.add("opacity");
    } else e.classList.remove("opacity");
  });
}

function goToSlideText(x) {
  contentText.forEach(
    (e, i) => (e.style.transform = `translate(${i - x}00%,-50%)`)
  );
}

img.forEach((e, i) => {
  e.style.transform = `translateX(${i * 100}%)`;
  if (i != 0) {
    e.classList.add("opacity");
  }
});

contentText.forEach(
  (e, i) => (e.style.transform = `translate(${i * 100}%,-50%)`)
);

img.forEach((_, i) => {
  if (i == 0) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dot dot-active" data-tt="${i}"></button>`
    );
  } else
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dot" data-tt="${i}"></button>`
    );
});

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dot")) {
    const current = e.target.dataset.tt;

    goToSlide(current);
    dotActive(current);
  }
});

let currentText = 0;
btnLeft.addEventListener("click", function () {
  currentText--;
  if (currentText < 0) {
    currentText = contentText.length - 1;
  }

  goToSlideText(currentText);
});

btnRight.addEventListener("click", function () {
  currentText++;
  if (currentText == contentText.length) {
    currentText = 0;
  }

  goToSlideText(currentText);
});
//scroll
//s2
const obsCallback = function (entries, observer) {
  entries.forEach((e) => {
    if (e.isIntersecting === true) {
      document.querySelectorAll(".card").forEach((e, i) => {
        document.querySelector(".title").classList.remove("hintder");
        e.classList.remove("hintder");
        e.style.transition = `${(i + 1) * 0.5}s`;
      });
    }
  });
};

const obsOptions = {
  root: null,
  threshold: 0.3,
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section2);

// section-3

const obsCallback3 = function (entries, observer3) {
  entries.forEach((e) => {
    if (e.isIntersecting === true) {
      document.querySelectorAll(".box").forEach((e, i) => {
        e.classList.remove("hintder");
        e.style.transition = `${(i + 1) * 0.4}s`;
      });
    }
  });
};

const observer3 = new IntersectionObserver(obsCallback3, obsOptions);
observer3.observe(section3);

//footer

const obsOptionsFooter = {
  root: null,
  threshold: 0,
};

const obsCallback4 = function (entries, observer4) {
  entries.forEach((e) => {
    if (e.isIntersecting === true) {
      footer.classList.remove("hintder");
    }
  });
};

const observer4 = new IntersectionObserver(obsCallback4, obsOptionsFooter);
observer4.observe(footer);
