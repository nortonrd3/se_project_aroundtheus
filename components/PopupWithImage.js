import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._image = this._popupElement.querySelector(".modal__card-image");
    this._title = this._popupElement.querySelector(".modal__card-title");
  }

  open(name, link) {
    this._title.textContent = name;
    this._image.alt = name;
    this._image.src = link;
    super.open();
  }
}
