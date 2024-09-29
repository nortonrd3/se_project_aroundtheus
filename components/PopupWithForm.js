import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = Array.from(this._popupForm.querySelectorAll(".modal__input"));
  }

  _getInputValues() {
    this._popupFormValues = {};
    this._inputList.forEach((input) => {
      this._popupFormValues[input.name] = input.value;
    });
    return this._popupFormValues;
  }

  close() {
    this._popupForm.reset();
    this._popupForm.removeEventListener("submit", () => {super.setEventListeners()});
    super.close();
  }

  returnInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}