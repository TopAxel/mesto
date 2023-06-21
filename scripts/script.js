//кнопки
const profile = document.querySelector('.profile');
const buttonOpenProfile = profile.querySelector('.profile__edit-button');
const buttonOpenAddCardProfile = profile.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_edit_profile');
const popupAddCardProfile = document.querySelector('.popup_add_card');
const popupOpenImage = document.querySelector('.popup_open_image');

// формы
const formElement = popupEditProfile.querySelector('.form');
const formElementCard = popupAddCardProfile.querySelector('.form');

//инпуты
const profileTitle = profile.querySelector('.profile__title')
const profileSubtitle = profile.querySelector('.profile__subtitle')
const popupName = formElement.querySelector('#user-name')
const popupProfessional = formElement.querySelector('#user-job')
const popupPlaceName = formElementCard.querySelector('#new-place')
const popupPhotoName = formElementCard.querySelector('#new-photo')

//картинка открытая 
const elementImg = popupOpenImage.querySelector('.opened-image__image');
const elementSignature = popupOpenImage.querySelector('.opened-image__signature');


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
const closeButtons = document.querySelectorAll('.popup__close-icon');

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
function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    profileTitle.textContent = popupName.value;
    profileSubtitle.textContent = popupProfessional.value;

    closePopup(popupEditProfile);
}

formElement.addEventListener('submit', handleProfileFormSubmit);

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


// Карточки
// const cardBlok = document.querySelector('.elements');
const cardsList = document.querySelector('.element');
// const cardTemplate = document.querySelector('.card__template').content;


// Создание экземпляров класса Card
initialCards.forEach(item => {
    const newCard = new Card(item, '.card__template', handlePreviewImage);
    const cardElement = newCard.generateCard();

    cardsList.append(cardElement);
});


// Отправка формы добавления карточки
function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const card = new Card({
        name: popupPlaceName.value,
        link: popupPhotoName.value
    }, '.card__template');

    const cardElement = card.generateCard();
    cardsList.prepend(cardElement);

    closePopup(popupAddCardProfile);
    formElementCard.reset();
}

formElementCard.addEventListener('submit', handleCardFormSubmit);



import { initialCards, Card } from './cards.js'
import { FormValidator } from './validate.js';



