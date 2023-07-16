export class UserInfo {
  // конструктор
  constructor({ userNameSelector, userInfoSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);
  }
  // Метод возвращает объект с данными пользователя
  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userInfo: this._userInfo.textContent,
    };
  }
  // Метод принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({ userName, userInfo }) {
    this._userName.textContent = userName;
    this._userInfo.textContent = userInfo;
  }
}