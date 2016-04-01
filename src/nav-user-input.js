'use strict';

export default function navUserInput() {
  const navbarButton = document.querySelector(`.navbar__button`);
  const dropdown = document.querySelector(`.dropdown`);
  navbarButton.addEventListener(`click`, () => {
    dropdown.classList.toggle(`slide`);
  });
}
