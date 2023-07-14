export class Popup {
    // конструктор 
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._popupCloseButton = this._popup.querySelector('.popup__close-icon');
    }
    // Метод открытия popup
    open() {
        this._popup.classList.add('popup_opened');
    }
    // Метод закрытия popup
    close() {
        this._popup.classList.remove('popup_opened');
    }
    // метод закрытия по кнопке Escape
    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        // Функция закрытия по оверлею
        const closeOverlayListener = function (evt) {
            if (evt.target === this._popup) {
                this.close();
            }
        };

        document.addEventListener('keydown', this._handleEscClose.bind(this));
        document.addEventListener('mousedown', closeOverlayListener.bind(this));
        this._popupCloseButton.addEventListener('click', () => this.close());
    }
}
