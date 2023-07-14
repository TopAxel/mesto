export class UserInfo {
    // конструктор
    constructor({ userNameSelector, userInfoSelector }) {
      this._userName = document.querySelector(userNameSelector);
      this._userInfo = document.querySelector(userInfoSelector);
    }
    // Метод возвращает объект с данными пользователя
    getUserInfo() {
      return {
        userName: this._userName,
        userInfo: this._userInfo,
      };
    }
    // Метод принимает новые данные пользователя и добавляет их на страницу
    setUserInfo({ userName, userInfo }) {
      this._userName.value = userName;
      this._userInfo.value = userInfo;
    }
  }
  