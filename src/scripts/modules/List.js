import $ from "jquery";

class List {
  constructor() {
    this.listElements = $(".list__item");
    this.events();
  }

  events() {
    this.listElements.click(this.toggleFewClasses);
  }

  toggleFewClasses() {
    const elementToDel = $("html").find("#" + $(this).attr("data-todel"));
    $(this).toggleClass("list__item--active");
    $(elementToDel).toggleClass("container--hidden");
  }
}

export default List;
