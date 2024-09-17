export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleCardDelete();
      });
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImagePreview();
      });
  }

  _handleLikeButton() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleCardDelete() {
    this._cardElement.remove();
  }

  _handleImagePreview() {
    this._handleImageClick(this._name, this._link);
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    const cardImageElement = this._cardElement.querySelector(".card__image");
    const cardTitleElement = this._cardElement.querySelector(".card__title");
    cardImageElement.src = this._link;
    cardImageElement.alt = this._name;
    cardTitleElement.textContent = this._name;
    this._setEventListeners();
    return this._cardElement;
  }
}
