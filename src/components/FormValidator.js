export class FormValidator {
  constructor(settings, formElement) {
    this._formElement = formElement;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._submitButtonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  _disableButton() {
    this._submitButtonElement.classList.add(this._inactiveButtonClass);
    this._submitButtonElement.disabled = true;
  }

  _enableButton() {
    this._submitButtonElement.classList.remove(this._inactiveButtonClass);
    this._submitButtonElement.disabled = false;
  }


  // проверяет валидность поля
  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
  }


  // добавляет класс с ошибкой
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  }

  // удаляет класс с ошибкой
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  // изменяет состояние кнопки сабмита
  _toggleButtonState() {
    const isFormValid = this._formElement.checkValidity();
    if (!isFormValid) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  // устанавливает все обработчики
  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._formElement.addEventListener('reset', () => {
      this._disableButton()
    })
    this._toggleButtonState();
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }



  // включает валидацию формы
  enableValidation() {
    this._setEventListeners();
  }
}