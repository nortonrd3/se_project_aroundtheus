export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._job.textContent,
    };
  }

  setUserInfo(data) {
    this._name.textContent = data.title;
    this._job.textContent = data.description;
  }
}
