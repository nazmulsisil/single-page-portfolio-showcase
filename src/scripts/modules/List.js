import $ from 'jquery';
import { getInFocusMark } from '../globalHelper';

class List {
  constructor() {
    this.listAnchor = $('.list__item a');
    this.listElements = $('.list__item');
    this.events();
  }

  events() {
    // this.listElements.click(this.toggleFewClasses);
    this.listAnchor.click(this.anchorClicked);
  }

  anchorClicked(e) {
    e.stopPropagation();
  }

  toggleFewClasses() {
    const elementToDel = $('html').find('#' + $(this).attr('data-todel'));
    $(this).toggleClass('list__item--active');
    $(elementToDel).toggleClass('container--hidden');

    const containerLoadTime = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue('--container-load-time');

    const delayToCallInFocusFunction = +containerLoadTime + 10;

    setTimeout(() => {
      getInFocusMark();
    }, delayToCallInFocusFunction);
  }
}

export default List;
