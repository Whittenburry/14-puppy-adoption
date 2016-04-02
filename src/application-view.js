'use strict';
import PuppyView from 'puppy-view';
import navUserInput from 'nav-user-input';
navUserInput();

export default class ApplicationView {
  constructor(element) {
    this.list = element.querySelector(`.puppy-list`);

    fetch(`http://tiny-tn.herokuapp.com/collections/ryan-puppy`)
      .then((response) => response.json())
      .then((data) => {
        this.puppies = data;

        this.render();
      });
  }

  render() {
    this.list.innerHTML = ``;

    this.puppies.forEach((item) => {
      const puppyView = new PuppyView(item, this);

      this.list.appendChild(puppyView.element);
    });
  }
}
