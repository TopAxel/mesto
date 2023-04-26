// кнопка редактирование профиля
const editProfileButton = document.querySelector('.profile__edit-button');
editProfileButton.addEventListener('click', function () {
    const editPopup = document.querySelector('.popup');
    editPopup.classList.remove('popup_opened');
});
// кнопка закрытитя профиля 
const editPopupCloseButton = document.querySelector('.popup__close-icon');
editPopupCloseButton.addEventListener('click', function () {
    const editPopup = document.querySelector('.popup');
    editPopup.classList.add('popup_opened');
});
// кнопка сохранить 
const editPopupSubmintButton = document.querySelector('.form__submit-button');
editPopupSubmintButton.addEventListener('click', function () {
    const editPopup = document.querySelector('.popup');
    editPopup.classList.add('popup_opened');
});

// инпуты
let profileTitle = 'Жак-Ив Кусто'
let profileSubtitle = 'Исследователь океана'

let userNameElement = document.querySelector('.profile__title');
userNameElement.textContent = profileTitle;

let userJobElement = document.querySelector('.profile__subtitle');
userJobElement.textContent = profileSubtitle;

let userName = document.querySelector('#user-name');
userName.value = profileTitle;

let userJob = document.querySelector('#user-job');
userJob.value = profileSubtitle;

// отправка формы
let formElement = document.querySelector('.form__submit-button').onclick = handleFormSubmit;

let nameInput = document.querySelector('#user-name');
let jobInput = document.querySelector('#user-job');


function handleFormSubmit(evt) {
    evt.preventDefault();

    let nameInput = document.querySelector('#user-name').value;
    let jobInput = document.querySelector('#user-job').value;


    let userNameElement = document.querySelector('.profile__title').textContent = nameInput;
    let userJobElement = document.querySelector('.profile__subtitle').textContent = jobInput;

}

formElement.addEventListener('submit', handleFormSubmit);











