export default class Section {
  constructor({ items , renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  renderItems() {
    // Render all elements on the page. Iterate through items array and call the renderer function on each item. This should be called once on page load.
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(cardElement) {
    // takes a DOM element and adds it to the container. Should be called when adding an individual card to the DOM.
    this._containerSelector.prepend(cardElement);
  }
}