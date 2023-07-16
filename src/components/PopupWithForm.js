import { Popup } from './Popup.js';
export class PopupWithForm extends Popup {
    // конструктор
    constructor(popupSelector, { submitFormCallback }) {
        super(popupSelector);
        this._submitFormCallback = submitFormCallback;
        this._popupForm = this._popup.querySelector('.form');
        this._inputList = Array.from(
            this._popupForm.querySelectorAll('.form__field')
        );
        this._submitButton = this._popup.querySelector('.form__submit-button');
    }
    // Метод собирает данные всех полей формы
    _getInputValues() {
        const formValues = {};
        for (let index = 0; index < this._inputList.length; index++) {
            const { name, value } = this._inputList[index];
            formValues[name] = value;
        }

        return formValues;
    }

    // Связываем с методом getInputValues, добавляем обработчик клика и обработчик сабмита формы
    setEventListeners() {
        // Перезаписывает родительский метод setEventListeners
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitFormCallback(this._getInputValues());
        });
    }

    // Метод закрытия popup (перезаписывает родителя)
    close() {
        super.close();
        this._popupForm.reset();
    }
}
