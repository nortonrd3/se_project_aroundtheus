import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupConfirmDeletion from "../components/PopupConfirmDeletion.js";
import Section from "../components/Section.js";
import { formValidationConfig } from "../utils/utils.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import "./index.css";

// Selectors
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const changeAvitarModal = document.querySelector("#edit-avatar-modal");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardForm = addCardModal.querySelector(".modal__form");
const addNewCardButton = document.querySelector(".profile__add-button");
const editAvatarButton = document.querySelector(".profile__avatar-button");
const avatarFormElement = changeAvitarModal.querySelector(".modal__form");

// Functions
function handleImageClick(name, link) {
  previewImagePopup.open(name, link);
}

function handleProfileEditSubmit(userData) {
  editProfilePopup.renderLoadingText(true);
  api
    .updateUserInfo(userData)
    .then((res) => {
      userInfo.setUserInfo({
        title: res.name,
        description: res.about,
      });
      editProfilePopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editProfilePopup.renderLoadingText(false);
    });
}

function handleAvatarSubmit(link) {
  editAvatarPopup.renderLoadingText(true);
  api
    .updateAvatar(link)
    .then((res) => {
      userInfo.updateAvatar(res.avatar);
      editAvatarPopup.close();
      avatarFormElement.reset();
      avatarFormValidator.disableButton();
    })
    .catch((err) => {
      console.error("Error updating avatar", err);
    })
    .finally(() => {
      editAvatarPopup.renderLoadingText(false);
    });
}

function handleAddCardSubmit(data) {
  // console.log(data);
  newCardPopup.renderLoadingText(true);
  api
    .addCard({
      name: data.name,
      link: data.link,
      _id: data.id,
      isLiked: data.isLiked,
    })
    .then((cardData) => {
      renderCard(cardData);
      newCardPopup.close();
      addCardForm.reset();
      addCardFormValidator.disableButton();
    })
    .catch((error) => {
      console.error("Error while adding card", error);
    })
    .finally(() => {
      newCardPopup.renderLoadingText(false);
    });
}


// Event Listeners
editAvatarButton.addEventListener("click", () => editAvatarPopup.open());

profileEditButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  profileTitleInput.value = data.name;
  profileDescriptionInput.value = data.description;
  editProfilePopup.open();
});

addNewCardButton.addEventListener("click", () => newCardPopup.open());

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

// API
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "6f07cb37-e9a8-4f19-ad7e-e33ed7b58580",
    "Content-Type": "application/json",
  },
});

let section;

api
  .getAllData()
  .then(([initialCards, userData]) => {
    userInfo.updateAvatar(userData.avatar);
    userInfo.setUserInfo({
      title: userData.name,
      description: userData.about,
    });
    section = new Section(
      {
        items: initialCards,
        renderer: renderCard,
      },
      ".cards__list"
    );
    section.renderItems();
  })
  .catch((err) => console.error(err));

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

const avatarFormValidator = new FormValidator(
  formValidationConfig,
  avatarFormElement
);
avatarFormValidator.enableValidation();

// Cards
function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleLikeIcon,
    handleDeleteCard
  );
  return card.getView();
}

const renderCard = (cardData) => {
  const cardElement = createCard(cardData);
  section.addItem(cardElement);
};

// handle Like Icon
function handleLikeIcon(card) {
  if (card.getIsLiked()) {
    api
      .removeLike(card.getCardId())
      .then(() => {
        card.handleLike(false);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .addLike(card.getCardId())
      .then(() => {
        card.handleLike(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

// handle deleting cards
function handleDeleteCard(card) {
  confirmDeletionPopup.open();
  confirmDeletionPopup.confirmDeletion(() => {
    api
      .deleteCard(card.getCardId())
      .then(() => {
        // window.location.reload();
        card.remove();
        confirmDeletionPopup.close();
      })
      .catch((err) => {
        console.error("Error deleting card", err);
      });
  });
}

// Instance of Section class

// const section = new Section(
//   { items: initialCards, renderer: renderCard },
//   ".cards__list"
// );
// section.renderItems();

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

const editAvatarPopup = new PopupWithForm({
  popupSelector: "#edit-avatar-modal",
  handleFormSubmit: handleAvatarSubmit,
});
editAvatarPopup.setEventListeners();

const previewImagePopup = new PopupWithImage({
  popupSelector: "#preview-image-modal",
});
previewImagePopup.setEventListeners();

const confirmDeletionPopup = new PopupConfirmDeletion({
  popupSelector: "#remove-card-modal",
  handleFormSubmit: () => {},
});
confirmDeletionPopup.setEventListeners();
