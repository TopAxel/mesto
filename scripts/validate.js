// Функция которая проверяет валидность поля
const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);

  } else {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  }
}

//Функция которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  inputElement.classList.add(inputErrorClass);
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
}

// Функция которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';

}

//неактивная кнопка "сохранить"
const toggleButtonState = (formElement, buttonElement, inactiveButtonClass) => {
  const isFormValid = formElement && formElement.checkValidity();
  buttonElement.classList.toggle(inactiveButtonClass, !isFormValid)
  buttonElement.disabled = !isFormValid;
}

//сброс кнопки "сохранить"
function removeButtonState(buttonElement, inactiveButtonClass) {
  toggleButtonState(false, buttonElement, inactiveButtonClass)
}

//функция валидации
const setEventListeners = (formElement, {
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  formElement.addEventListener('submit', e => {
    e.preventDefault();
    removeButtonState(buttonElement, inactiveButtonClass)
  });


  toggleButtonState(formElement, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(formElement, buttonElement, inactiveButtonClass);
    });
  })
}

// валидация всех форм 
const enableValidation = ({
  formSelector,
  ...rest
}) => {
  const getFormList = Array.from(document.querySelectorAll(formSelector));
  getFormList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, rest);
  })
};


enableValidation({
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__field_type_error',
  errorClass: 'form__field-error_active'
});

