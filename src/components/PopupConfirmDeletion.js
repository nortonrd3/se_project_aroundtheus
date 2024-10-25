import Popup from "./Popup";
export default class PopupConfirmDeletion extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._deleteButton = this._popupElement.querySelector(
      ".modal__button_remove"
    );
    this._isSubmitted = false;
    this._cardId = null;
    this._card = null;
  }

  open(card, cardId) {
    this._card = card;
    this._cardId = cardId;
    super.open();
  }

  getIsSubmitted() {
    return this._isSubmitted;
  }

  confirmDeletion(api) {
    this._handleFormSubmit = api;
  }

  setEventListeners() {
    super.setEventListeners();
    this._deleteButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._isSubmitted = true;
      this._handleFormSubmit(this._card, this._cardId);
    });
  }
}
