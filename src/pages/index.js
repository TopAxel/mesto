import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { initialCards } from '../cards/initialCards.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import '../pages/index.css';

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
// const profileTitle = profile.querySelector('.profile__title');
// const profileSubtitle = profile.querySelector('.profile__subtitle');
const popupName = profileForm.querySelector('#user-name');
const popupProfessional = profileForm.querySelector('#user-job');
// const popupPlaceName = formElementCard.querySelector('#new-place');
// const popupPhotoName = formElementCard.querySelector('#new-photo');

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
    popupName.value = userInfo.getUserInfo().userName;
    popupProfessional.value = userInfo.getUserInfo().userInfo;
});

// Отправка формы редактирования профиля
function handleProfileFormSubmit() {
    userInfo.setUserInfo({
        userName: popupName.value,
        userInfo: popupProfessional.value,
    });
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

// Отправка формы добавления карточки
function handleCardFormSubmit(cardInfo) {
    const cardData = {
        name: cardInfo["new-place"],
        link: cardInfo["new-photo"],
    };
    const cardElement = createCard(cardData, '.card__template');
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

