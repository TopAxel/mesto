export class Popup {
    // конструкто
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._popupCloseButton = this._popup.querySelector('.popup__close-icon');
        this._handleEscClose = this._handleEscClose.bind(this);
        this._closeOverlayListener = this._closeOverlayListener.bind(this);
    }
    // Метод открытия popup
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
        document.addEventListener('mousedown', this._closeOverlayListener);
    }
    // Метод закрытия popup
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
        document.removeEventListener('mousedown', this._closeOverlayListener);
    }
    // метод закрытия по кнопке Escape
    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }
    // метод закрытия по overlay
    _closeOverlayListener(event) {
        if (event.target === this._popup) {
            this.close();
        }
    }
    // слушатель
    setEventListeners() {
        this._popupCloseButton.addEventListener('click', () => this.close());
    }
}