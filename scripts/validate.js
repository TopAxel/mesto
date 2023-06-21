// // Функция которая проверяет валидность поля
// const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
//   if (inputElement.validity.valid) {
//     hideInputError(formElement, inputElement, inputErrorClass, errorClass);

//   } else {
//     showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
//   }
// }

// //Функция которая добавляет класс с ошибкой
// const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
//   inputElement.classList.add(inputErrorClass);
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   errorElement.classList.add(errorClass);
//   errorElement.textContent = errorMessage;
// }

// // Функция которая удаляет класс с ошибкой
// const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.remove(inputErrorClass);
//   errorElement.classList.remove(errorClass);
//   errorElement.textContent = '';

// }

// //неактивная кнопка "сохранить"
// const toggleButtonState = (formElement, buttonElement, inactiveButtonClass) => {
//   const isFormValid = formElement && formElement.checkValidity();
//   buttonElement.classList.toggle(inactiveButtonClass, !isFormValid)
//   buttonElement.disabled = !isFormValid;
// }

// //сброс кнопки "сохранить"
// function removeButtonState(buttonElement, inactiveButtonClass) {
//   toggleButtonState(false, buttonElement, inactiveButtonClass)
// }

// //функция валидации
// const setEventListeners = (formElement, {
//   inputSelector,
//   submitButtonSelector,
//   inactiveButtonClass,
//   inputErrorClass,
//   errorClass
// }) => {
//   const inputList = Array.from(formElement.querySelectorAll(inputSelector));
//   const buttonElement = formElement.querySelector(submitButtonSelector);

//   formElement.addEventListener('submit', e => {
//     e.preventDefault();
//     removeButtonState(buttonElement, inactiveButtonClass)
//   });


//   toggleButtonState(formElement, buttonElement, inactiveButtonClass);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', () => {
//       checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
//       toggleButtonState(formElement, buttonElement, inactiveButtonClass);
//     });
//   })
// }

// // валидация всех форм 
// const enableValidation = ({
//   formSelector,
//   ...rest
// }) => {
//   const getFormList = Array.from(document.querySelectorAll(formSelector));
//   getFormList.forEach((formElement) => {
//     formElement.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//     });
//     setEventListeners(formElement, rest);
//   })
// };


// enableValidation({
//   formSelector: '.form',
//   inputSelector: '.form__field',
//   submitButtonSelector: '.form__submit-button',
//   inactiveButtonClass: 'form__submit-button_disabled',
//   inputErrorClass: 'form__field_type_error',
//   errorClass: 'form__field-error_active'
// });



export class FormValidator {
  constructor(settings, formElement) {
    this._formElement = formElement;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
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
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    buttonElement.classList.toggle(this._inactiveButtonClass, !isFormValid)
    buttonElement.disabled = !isFormValid;
  }

  // устанавливает все обработчики
  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    })
    this._toggleButtonState();
  }

  // включает валидацию формы
  enableValidation() {
    this._formElement.addEventListener('submit', e => {
      e.preventDefault();
    });
    this._setEventListeners();
  }
}

// валидация всех форм
const formList = document.querySelectorAll('.form');
formList.forEach((formElement) => {
  const formValidator = new FormValidator({
    inputSelector: '.form__field',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_disabled',
    inputErrorClass: 'form__field_type_error',
    errorClass: 'form__field-error_active'
  }, formElement);
  formValidator.enableValidation();
});


