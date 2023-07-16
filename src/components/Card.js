export class Card {
    constructor(data, templateSelector, handlePreviewImage) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handlePreviewImage = handlePreviewImage;
        this._likeButton = null;
        this._deleteButton = null;
        this._photo = null;
        this._title = null;
    }

    _getTemplate() {
        return document.querySelector(this._templateSelector).content.querySelector('.element__card').cloneNode(true);
    }

    _handleLikeIcon() {
        this._likeButton.classList.toggle('element__like-icon_active');
    }

    _handleDeleteIcon() {
        this._element.remove();
    }

    _handlePhotoClick() {
        const popupImageData = {
            name: this._name,
            link: this._link
        };
        this._handlePreviewImage(popupImageData);
    }

    _setEventListeners() {
        this._likeButton = this._element.querySelector('.element__like-icon');
        this._deleteButton = this._element.querySelector('.element__delete-icon');
        this._photo = this._element.querySelector('.element__photo');
        this._title = this._element.querySelector('.element__title');

        this._likeButton.addEventListener('click', this._handleLikeIcon.bind(this));
        this._deleteButton.addEventListener('click', this._handleDeleteIcon.bind(this));
        this._photo.addEventListener('click', this._handlePhotoClick.bind(this));
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._photo.setAttribute('src', this._link);
        this._photo.setAttribute('alt', this._name);
        this._title.textContent = this._name;

        return this._element;
    }
}

