export default class UserInfo {
  constructor({nameSelector, jobSelector}) {
    this._nameSelector = document.querySelector(nameSelector);
    this._jobSelector = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      name: this._nameSelector.textContent,
      description: this._jobSelector.textContent
    };
  }

  setUserInfo(data) {
    this._nameSelector.textContent = data.title;
    this._jobSelector.textContent = data.description;
  }
}