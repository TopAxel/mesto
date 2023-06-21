export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


export class Card {
    constructor(data, templateSelector, handlePreviewImage) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handlePreviewImage = handlePreviewImage;

    }

    _getTemplate() {
        return document.querySelector(this._templateSelector).content;

    }

    _setEventListeners() {
        this._element.querySelector('.element__like-icon').addEventListener('click', () => {
            this._element.querySelector('.element__like-icon').classList.toggle('element__like-icon_active');
        });

        this._element.querySelector('.element__delete-icon').addEventListener('click', () => {
            this._element.remove();
        });

        this._element.querySelector('.element__photo').addEventListener('click', () => {
            const popupImageData = {
                name: this._name,
                link: this._link
            };
            this._handlePreviewImage(popupImageData);
        });
    }

    generateCard() {
        this._element = this._getTemplate().querySelector('.element__card').cloneNode(true);
        this._setEventListeners();

        this._element.querySelector('.element__photo').setAttribute('src', this._link);
        this._element.querySelector('.element__photo').setAttribute('alt', this._name);
        this._element.querySelector('.element__title').textContent = this._name;

        return this._element;
    }
}



