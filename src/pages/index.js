import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import { initialCards } from "../utils/utils.js";
import { formValidationConfig } from "../utils/utils.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import "./index.css";

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardForm = addCardModal.querySelector(".modal__form");
const addNewCardButton = document.querySelector(".profile__add-button");

function handleImageClick(name, link) {
  previewImagePopup.open(name, link);
}

function handleProfileEditSubmit(data) {
  userInfo.setUserInfo(data);
  editProfilePopup.close();
}

function handleAddCardSubmit(cardData) {
  renderCard(cardData);
  newCardPopup.close();
}

profileEditButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  profileTitleInput.value = data.name;
  profileDescriptionInput.value = data.description;
  editProfilePopup.open();
});

addNewCardButton.addEventListener("click", () => newCardPopup.open());

// API
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "6f07cb37-e9a8-4f19-ad7e-e33ed7b58580",
    "Content-Type": "application/json",
  },
});

fetch("https://around-api.en.tripleten-services.com/v1/cards", {
  method: "POST",
  headers: {
    authorization: "6f07cb37-e9a8-4f19-ad7e-e33ed7b58580",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  }),
});

api.getAllData();

// Form Validation
const addCardFormValidator = new FormValidator(
  formValidationConfig,
  addCardForm
);
addCardFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator(
  formValidationConfig,
  profileEditForm
);
editProfileFormValidator.enableValidation();

// Cards
function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

const renderCard = (cardData) => {
  const cardElement = createCard(cardData);
  section.addItem(cardElement);
};

// Instace of Section class

const section = new Section(
  { items: initialCards, renderer: renderCard },
  ".cards__list"
);
section.renderItems();

// Popups

const newCardPopup = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: handleAddCardSubmit,
});
newCardPopup.setEventListeners();

const editProfilePopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: handleProfileEditSubmit,
});
editProfilePopup.setEventListeners();

const previewImagePopup = new PopupWithImage({
  popupSelector: "#preview-image-modal",
});
previewImagePopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});
