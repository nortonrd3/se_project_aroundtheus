export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._job.textContent,
      avatar: this._avatar.src,
    };
  }

  setUserInfo(data) {
    this._name.textContent = data.title;
    this._job.textContent = data.description;
  }

  updateAvatar(avatar) {
    this._avatar.src = avatar;
  }
}
