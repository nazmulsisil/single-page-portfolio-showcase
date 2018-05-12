import $ from 'jquery';

class ClickFn {
  constructor(itemToClick, elementsParent, elementToAppend) {
    this.itemToClick = itemToClick;
    this.elementsParent = elementsParent;
    this.elementToAppend = elementToAppend;
    this.events();
  }

  events() {
    const that = this;
    this.itemToClick.on('click', that.appendDiv.bind(this));
  }

  appendDiv() {
    this.elementsParent.append(this.elementToAppend);
  }
}

export default ClickFn;
