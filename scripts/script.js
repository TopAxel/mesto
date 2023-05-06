//кнопки
const buttonOpenProfile = document.querySelector('.profile__edit-button');
const buttonCloseProfile = document.querySelector('.popup__close-icon');
// форма
const formElement = document.querySelector('.form');
//попап
const popupProfile = document.querySelector('.popup');
//инпуты
const profileTitle = document.querySelector('.profile__title')
const profileSubtitle = document.querySelector('.profile__subtitle')
const popupName = popupProfile.querySelector('#user-name')
const popupProfessional = popupProfile.querySelector('#user-job')
//функции закрытие/открытие попапа, редактирования иппутов, отправка формы

function handleFormSubmit(evt) {
    evt.preventDefault();
}

function openPopupProfile() {
    popupProfile.classList.add('popup_opened');
    popupName.value = profileTitle.textContent
    popupProfessional.value = profileSubtitle.textContent
}

function closePopupProfile() {
    popupProfile.classList.remove('popup_opened');
}

function handleFormSubmit(e) {
    e.preventDefault()
    profileTitle.textContent = popupName.value
    profileSubtitle.textContent = popupProfessional.value
    closePopupProfile()
}

//слушатели
formElement.addEventListener('submit', handleFormSubmit);
buttonOpenProfile.addEventListener('click', openPopupProfile);
buttonCloseProfile.addEventListener('click', closePopupProfile);








