'use strict';
import PuppyView from 'puppy-view';
import CreateFormView from 'create-form';

export default class ApplicationView {
  constructor(element) {
    this.list = element.querySelector(`.puppy-list`);

    fetch(`http://tiny-tn.herokuapp.com/collections/jw-puppy`)
      .then((response) => response.json())
      .then((data) => {
        this.puppies = data;

        this.render();
      });

    this.form = new CreateFormView(element, this);
  }

  render() {
    this.list.innerHTML = ``;

    this.puppies.forEach((item) => {
      const puppyView = new PuppyView(item, this);

      this.list.appendChild(puppyView.element);
    });
  }

  addNewPup(pup) {
    this.puppies = [pup, ...this.puppies];

    this.render();
  }

  remove(puppy) {
    this.puppies = this.puppies.filter((current) => {
      return current !== puppy;
    });
    this.render();
  }
}
