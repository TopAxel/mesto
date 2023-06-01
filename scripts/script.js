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
    document.addEventListener('mousedown', clouseOverlayListener);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeEscButton);
    document.removeEventListener('mousedown', clouseOverlayListener);
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
const clouseOverlayListener = function (evt) {
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
const cardBlok = document.querySelector('.elements');
const cardsList = document.querySelector('.element');
const cardTemplate = document.querySelector('.card__template').content;

// Функции создания и добавления карточек
function creatingCard(cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const elementPhoto = cardElement.querySelector('.element__photo');
    const elementTitle = cardElement.querySelector('.element__title');
    const likeButton = cardElement.querySelector('.element__like-icon');
    const deleteButton = cardElement.querySelector('.element__delete-icon');

    elementPhoto.src = cardData.link;
    elementPhoto.alt = cardData.name;
    elementTitle.textContent = cardData.name;

    likeButton.addEventListener('click', evt => {
        evt.target.classList.toggle('element__like-icon_active');
    });

    deleteButton.addEventListener('click', evt => {
        evt.target.closest('.element__card').remove();
    });

    elementPhoto.addEventListener('click', evt => {
        const targetImage = evt.target;

        const cardData = {
            name: targetImage.alt,
            link: targetImage.src
        };

        handlePreviewImage(cardData);
    });

    return cardElement;
}

function addCard(cardData, cardContainer, newCard) {
    const card = creatingCard(cardData);

    if (newCard) {
        cardContainer.prepend(card);
    } else {
        cardContainer.append(card);
    }
}

// Карточки 
initialCards.forEach(item => {
    addCard(item, cardsList, false);
});


// Отправка формы добавления карточки

function handleCardFormSubmit(evt) {
    evt.preventDefault();

    addCard({
        name: popupPlaceName.value,
        link: popupPhotoName.value
    }, cardsList, true);

    closePopup(popupAddCardProfile);

    formElementCard.reset();
}

formElementCard.addEventListener('submit', handleCardFormSubmit);

