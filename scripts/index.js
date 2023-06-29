import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './initialCards.js';

//кнопки
const profile = document.querySelector('.profile');
const buttonOpenProfile = profile.querySelector('.profile__edit-button');
const buttonOpenAddCardProfile = profile.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_edit_profile');
const popupAddCardProfile = document.querySelector('.popup_add_card');
const popupOpenImage = document.querySelector('.popup_open_image');
const closeButtons = document.querySelectorAll('.popup__close-icon');
// формы
const profileForm = popupEditProfile.querySelector('.form');
const formElementCard = popupAddCardProfile.querySelector('.form');
const formList = document.querySelectorAll('.form');
//инпуты
const profileTitle = profile.querySelector('.profile__title')
const profileSubtitle = profile.querySelector('.profile__subtitle')
const popupName = profileForm.querySelector('#user-name')
const popupProfessional = profileForm.querySelector('#user-job')
const popupPlaceName = formElementCard.querySelector('#new-place')
const popupPhotoName = formElementCard.querySelector('#new-photo')
//картинка открытая 
const elementImg = popupOpenImage.querySelector('.opened-image__image');
const elementSignature = popupOpenImage.querySelector('.opened-image__signature');
// Карточки
const cardsContainer = document.querySelector('.element');
//функция закрытие/открытие попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeEscButton);
    document.addEventListener('mousedown', closeOverlayListener);
}
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeEscButton);
    document.removeEventListener('mousedown', closeOverlayListener);
}
// функция закрытия всех попапов
closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});
// Функция закрытия по кнопке Escape
const closeEscButton = (evt) => {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}
// Функция закрытия по оверлею 
const closeOverlayListener = function (evt) {
    const openedPopup = document.querySelector('.popup_opened');
    if (evt.target === openedPopup) {
        closePopup(openedPopup);
    }
}
// окно редактирования профиля
buttonOpenProfile.addEventListener('click', () => {
    openPopup(popupEditProfile);
    popupName.value = profileTitle.textContent;
    popupProfessional.value = profileSubtitle.textContent;
});
// Отправка формы редактирования профиля
function handleProfileFormSubmit() {
    profileTitle.textContent = popupName.value;
    profileSubtitle.textContent = popupProfessional.value;
    closePopup(popupEditProfile);
}
// окно добавления карточки
buttonOpenAddCardProfile.addEventListener('click', () => {
    openPopup(popupAddCardProfile);
});
// Открытие и закрытие окна с картинкой
function handlePreviewImage(popupImageData) {
    openPopup(popupOpenImage);
    elementImg.src = popupImageData.link;
    elementImg.alt = popupImageData.name;
    elementSignature.textContent = popupImageData.name;
}
// Создание карточки
function createCard(data, templateSelector, handlePreviewImage) {
    const newCard = new Card(data, templateSelector, handlePreviewImage);
    const cardElement = newCard.generateCard();
    return cardElement;
}
// Отображение карточек
function renderCards(cardsData) {
    cardsData.forEach(item => {
        const cardElement = createCard(item, '.card__template', handlePreviewImage);
        cardsContainer.append(cardElement);
    });
}
// Отображение изначальных карточек
renderCards(initialCards);
// Добавление новой карточки
function addNewCard(cardData) {
    const cardElement = createCard(cardData, '.card__template', handlePreviewImage);
    cardsContainer.prepend(cardElement);
}
// Отправка формы добавления карточки
function handleCardFormSubmit() {
    const cardData = {
        name: popupPlaceName.value,
        link: popupPhotoName.value
    };
    addNewCard(cardData);
    closePopup(popupAddCardProfile);
    formElementCard.reset();
}
// валидация всех форм
formList.forEach((formElement) => {
    const formValidator = new FormValidator({
        formSelector: '.form',
        inputSelector: '.form__field',
        submitButtonSelector: '.form__submit-button',
        inactiveButtonClass: 'form__submit-button_disabled',
        inputErrorClass: 'form__field_type_error',
        errorClass: 'form__field-error_active'
    }, formElement);
    formValidator.enableValidation();
});
// отмена стандартного поведения формы
formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });
});
// слушатели submit
profileForm.addEventListener('submit', handleProfileFormSubmit);
formElementCard.addEventListener('submit', handleCardFormSubmit);

