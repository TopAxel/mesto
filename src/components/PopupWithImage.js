import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    //конструктор
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.opened-image__image');
        this._elementSignature = this._popup.querySelector(
            '.opened-image__signature'
        );
    }
    // Метод перезаписывает родительский метод open
    open(description, image) {
        this._elementSignature.textContent = description;
        this._popupImage.src = image;
        this._popupImage.alt = description;

        super.open();
    }
}

