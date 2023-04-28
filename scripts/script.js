//кнопки
const buttonOpenProfile = document.querySelector('.profile__edit-button');
const buttonCloseProfile = document.querySelector('.popup__close-icon');
const buttonSubmitProfile = document.querySelector('.form__submit-button');
//попап
const popupProfile = document.querySelector('.popup');
//инпуты
const profileTitle = document.querySelector('.profile__title')
const profileSubtitle = document.querySelector('.profile__subtitle')
const popupName = popupProfile.querySelector('#user-name')
const popupProfessional = popupProfile.querySelector('#user-job')
//функции закрытие/открытие попапа, редактирования иппутов
function openPopupProfile() {
    popupProfile.classList.add('popup_opened');
    popupName.value = profileTitle.textContent
    popupProfessional.value = profileSubtitle.textContent
}

function closePopupProfile() {
    popupProfile.classList.remove('popup_opened');
}

function saveProfileData(e) {
    e.preventDefault()
    profileTitle.textContent = popupName.value
    profileSubtitle.textContent = popupProfessional.value
    closePopupProfile()
}
//слушатели
buttonSubmitProfile.addEventListener('click', saveProfileData);
buttonOpenProfile.addEventListener('click', openPopupProfile);
buttonCloseProfile.addEventListener('click', closePopupProfile);








