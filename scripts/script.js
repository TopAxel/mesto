const buttonOpenProfile = document.querySelector('.profile__edit-button');
const buttonCloseProfile = document.querySelector('.popup__close-icon');
const buttonSubmitProfile = document.querySelector('.form__submit-button');
const popupProfile = document.querySelector('.popup');
const profileTitle = document.querySelector('.profile__title')
const profileSubtitle = document.querySelector('.profile__subtitle')
const popupName = popupProfile.querySelector('#user-name')
const popupProfessional = popupProfile.querySelector('#user-job')

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

buttonSubmitProfile.addEventListener('click', saveProfileData);
buttonOpenProfile.addEventListener('click', openPopupProfile);
buttonCloseProfile.addEventListener('click', closePopupProfile);








