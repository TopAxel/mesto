import { Card } from './scripts/Card.js';
import { FormValidator } from './scripts/FormValidator.js';
import { initialCards } from './scripts/initialCards.js';
import { PopupWithForm } from './scripts/PopupWithForm.js';
import { PopupWithImage } from './scripts/PopupWithImage.js';
import { Section } from './scripts/Section.js';
import { UserInfo } from './scripts/UserInfo.js';
import '../src/pages/index.css';

//кнопки
const profile = document.querySelector('.profile');
const buttonOpenProfile = profile.querySelector('.profile__edit-button');
const buttonOpenAddCardProfile = profile.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_edit_profile');
const popupAddCardProfile = document.querySelector('.popup_add_card');

// формы
const profileForm = popupEditProfile.querySelector('.form');
const formElementCard = popupAddCardProfile.querySelector('.form');
const formList = document.querySelectorAll('.form');

//инпуты
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');
const popupName = profileForm.querySelector('#user-name');
const popupProfessional = profileForm.querySelector('#user-job');
const popupPlaceName = formElementCard.querySelector('#new-place');
const popupPhotoName = formElementCard.querySelector('#new-photo');

// Карточки
const cardsContainer = document.querySelector('.element');

// окно редактирования профиля
const profilePopup = new PopupWithForm('.popup_edit_profile', {
    submitFormCallback: handleProfileFormSubmit,
});
profilePopup.setEventListeners();

const userInfo = new UserInfo({
    userNameSelector: '.profile__title',
    userInfoSelector: '.profile__subtitle',
});


buttonOpenProfile.addEventListener('click', () => {
    profilePopup.open();
    userInfo.setUserInfo({
        userName: profileTitle.textContent,
        userInfo: profileSubtitle.textContent,
    });
    popupName.value = profileTitle.textContent;
    popupProfessional.value = profileSubtitle.textContent;
});

// Отправка формы редактирования профиля
function handleProfileFormSubmit() {
    const userInfoData = profilePopup._getInputValues();
    userInfo.setUserInfo({
        userName: userInfoData['user-name'],
        userInfo: userInfoData['user-job'],
    });
    profileTitle.textContent = popupName.value;
    profileSubtitle.textContent = popupProfessional.value;
    profilePopup.close();
}

// окно добавления карточки
const addCardPopupWithForm = new PopupWithForm('.popup_add_card', {
    submitFormCallback: handleCardFormSubmit,
});

addCardPopupWithForm.setEventListeners();

buttonOpenAddCardProfile.addEventListener('click', () => {
    addCardPopupWithForm.open();
});

// картинка открытая
const popupWithImage = new PopupWithImage('.popup_open_image');
popupWithImage.setEventListeners();

// Открытие и закрытие окна с картинкой
function handlePreviewImage(popupImageData) {
    popupWithImage.open(popupImageData.name, popupImageData.link);
}

// Создание карточки
function createCard(data, templateSelector, handlePreviewImage) {
    const newCard = new Card(data, templateSelector, handlePreviewImage);
    const cardElement = newCard.generateCard();
    return cardElement;
}

// Отображение карточек
function renderCards(carItem) {
    const cardElement = createCard(
        carItem,
        '.card__template',
        handlePreviewImage
    );
    cardsContainer.append(cardElement);
}

// Отображение изначальных карточек
const sectionInstance = new Section(
    { items: initialCards, renderer: renderCards },
    '.element'
);

sectionInstance.render();

// Добавление новой карточки
function createNewCard(cardData) {
    const cardElement = createCard(
        cardData,
        '.card__template',
        handlePreviewImage
    );
    return cardElement;
}

// Отправка формы добавления карточки
function handleCardFormSubmit() {
    const cardData = {
        name: popupPlaceName.value,
        link: popupPhotoName.value,
    };
    const cardElement = createNewCard(cardData);
    sectionInstance.addItem(cardElement);
    addCardPopupWithForm.close();
}

// валидация всех форм
formList.forEach((formElement) => {
    const formValidator = new FormValidator(
        {
            formSelector: '.form',
            inputSelector: '.form__field',
            submitButtonSelector: '.form__submit-button',
            inactiveButtonClass: 'form__submit-button_disabled',
            inputErrorClass: 'form__field_type_error',
            errorClass: 'form__field-error_active',
        },
        formElement
    );
    formValidator.enableValidation();
});

// отмена стандартного поведения формы
formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });
});

