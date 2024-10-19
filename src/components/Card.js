export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleLikeIcon,
    handleDeleteCard
  ) {
    this._name = data.name;
    this._link = data.link;
    this.id = data._id;
    this._isLiked = data.isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleLikeIcon = handleLikeIcon;
    this.handleDeleteCard = handleDeleteCard;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this.handleDeleteCard(this);
      });
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImagePreview(this._name, this._link);
      });
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon(this);
      });
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _renderLikes() {
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  handleLike(isLiked) {
    this._isLiked = isLiked;
    this._renderLikes();
  }

  getCardId() {
    return this.id;
  }

  getIsLiked() {
    return this._isLiked;
  }

  handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleImagePreview() {
    this._handleImageClick(this._name, this._link);
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._cardTitleElement = this._cardElement.querySelector(".card__title");
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    this._cardTitleElement.textContent = this._name;
    this._setEventListeners();
    this._renderLikes(this._isLiked);
    return this._cardElement;
  }
}
