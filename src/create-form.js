'use strict';

export default class CreateFormView {
  constructor(element, app) {
    this.element = element;
    this.app = app;

    this.formToggle();
    this.submit();
  }

  formToggle() {
    const navbarButton = this.element.querySelector(`.navbar__button`);
    navbarButton.addEventListener(`click`, () => {
      this.slideForm();
    });
  }

  slideForm() {
    const dropdown = this.element.querySelector(`.dropdown`);

    dropdown.classList.toggle(`slide`);
  }

  submit() {
    const form = this.element.querySelector(`.dropdown-form`);
    // Grab values for all
    form.addEventListener(`submit`, (ev) => {
      ev.preventDefault();

      const formValues = {
        name: this.element.querySelector(`.dropdown-name`).value,
        age: this.element.querySelector(`.dropdown-age`).value,
        photoUrl: this.element.querySelector(`.dropdown-photo-url`).value,
        profile: this.element.querySelector(`.dropdown-profile`).value,
      };

      fetch(`http://tiny-tn.herokuapp.com/collections/jw-puppy`, {
        method: `post`,
        headers: {
          Accept: `application/json`,
          'Content-Type': `application/json`,
        },
        body: JSON.stringify(formValues),
      }).then((response) => response.json())
        .then((data) => {
          this.element.querySelector(`.dropdown-name`).value = ``;
          this.element.querySelector(`.dropdown-age`).value = ``;
          this.element.querySelector(`.dropdown-photo-url`).value = ``;
          this.element.querySelector(`.dropdown-profile`).value = ``;

          // Inform the application that a new puppy exists in the list
          this.app.addNewPup(data);
          this.slideForm();
        });
    });
  }
}
