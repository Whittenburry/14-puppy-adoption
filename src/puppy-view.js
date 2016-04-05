'use strict';

export default class PuppyView {
  constructor(puppy, app) {
    this.puppy = puppy;
    this.app = app;

    this.element = document.createElement(`div`);
    this.element.classList.add(`main-content`);
    this.element.innerHTML = `
      <div class="content-container">
        <div class="content-container__img"><img class="puppy-pic" src="" alt="p"></div>
        <div class="content-container__info">
          <div class="info">
            <h6 class="info__description">Name</h6>
            <input value="" class="info__user-text name"></input>
          </div>
          <div class="info">
            <h6 class="info__description">Age</h6>
            <input value="" class="info__user-text age"></input>
          </div>
          <div class="info">
            <h6 class="info__description">Photo URL</h6>
            <input value="" class="info__user-text photo-url"></input>
          </div>
          <div class="info">
            <h6 class="info__description">Profile</h6>
            <input value="" class="info__user-text profile"></input>
          </div>
          <div class="buttons-container">
            <button class="buttons-container__button destroy">Delete</button>
            <button class="buttons-container__button update">Update</button>
          </div>
        </div>
      </div>`;

    this.render();
    this.listenForDelete();
    this.updatePuppy();
  }

  listenForDelete() {
    this.element.querySelector(`.destroy`).addEventListener(`click`, () => {
      if (window.confirm(`Are you sure?`)) {
        fetch(`http://tiny-tn.herokuapp.com/collections/jw-puppy/${this.puppy._id}`, {
          method: `Delete`
        }).then(() => {
          this.app.remove(this.puppy);
        });
      }
    });
  }

  updatePuppy() {
    const puppiesUpdated = document.querySelector(`input`).value;

    fetch(`http://tiny-tn.herokuapp.com/collections/jw-puppy/${this.puppy._id}`, {
      method: `Put`,
      headers: {
        Accept: `application/json`,
        'Content-type': `application/json`,
      },
      body: JSON.stringify({...this.puppy, puppiesUpdated})
    }).then((response) => {
      return response.json();
    }).then((updatedPuppy) => {
      Object.assign(this.puppy, updatedPuppy);

      this.render();
    })
  }

  render() {
    // debugger;
    this.element.querySelector(`.puppy-pic`).setAttribute(`src`, this.puppy.photoUrl);
    this.element.querySelector(`.name`).value = this.puppy.name;
    this.element.querySelector(`.age`).value = this.puppy.age;
    this.element.querySelector(`.photo-url`).value = this.puppy.photoUrl;
    this.element.querySelector(`.profile`).value = this.puppy.profile;
  }
}
