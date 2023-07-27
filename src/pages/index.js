import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { initialCards } from '../cards/initialCards.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import '../pages/index.css';

//кнопки
const buttonOpenProfile = document.querySelector('.profile__edit-button');
const buttonOpenAddCardProfile = document.querySelector('.profile__add-button');
const buttonOpenAvatar = document.querySelector('.profile__avatar-button');
const popupEditProfile = document.querySelector('.popup_edit_profile');
const popupAddCardProfile = document.querySelector('.popup_add_card');
const popupEditAvatar = document.querySelector('.popup_change_avatar');

// формы
const profileForm = popupEditProfile.querySelector('.form');
const formElementCard = popupAddCardProfile.querySelector('.form');
const formElementAvatar = popupEditAvatar.querySelector('.form');

//инпуты
const popupName = profileForm.querySelector('#name');
const popupProfessional = profileForm.querySelector('#job');
// аватар
const avatar = document.querySelector('.profile__avatar');

const settings = {
    formSelector: '.form',
    inputSelector: '.form__field',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_disabled',
    inputErrorClass: 'form__field_type_error',
    errorClass: 'form__field-error_active',
};

// Api
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-71',
    headers: {
        authorization: '839b9b9e-ee93-4e28-b0f6-59cf94fe7df3',
        'Content-Type': 'application/json'
    }
});

let userId;

// Загрузка готовых карточек и данных о пользователе с сервера
Promise.all([api.getInitialCards(), api.getUserInfo()])
    .then(([initialCards, userData]) => {
        userInfo.setUserInfo(userData);
        userId = userData._id;
        initialCards.reverse();
        cardsList.renderItems(initialCards);
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    });

// создание экземпляра класса, отвечающего за отображение информации о пользователе
const userInfo = new UserInfo({
    username: '.profile__title',
    job: '.profile__subtitle',
    avatar: '.profile__avatar'
});

// создание попапа с формой редактирования профиля
const editProfilePopup = new PopupWithForm({
    popupSelector: '.popup_edit_profile',
    handleFormSubmit: (dataForm) => {
        editProfilePopup.loading(true);
        api.editUserInfo(dataForm)
            .then((dataForm) => {
                userInfo.setUserInfo(dataForm);
                editProfilePopup.close();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
                editProfilePopup.loading(false);
            });
    }
});
editProfilePopup.setEventListeners();

// Заносим данные в форму попапа редактирования профиля
function fillInEditProfileFormInputs({ username, job }) {
    popupName.value = username;
    popupProfessional.value = job;

}


// Создание попапа редактирования аватара пользователя
const editAvatarPopup = new PopupWithForm({
    popupSelector: '.popup_change_avatar',
    handleFormSubmit: (data) => {
        editAvatarPopup.loading(true);
        api.editAvatar(data)
            .then((data) => {
                userInfo.setUserAvatar(data);
                editAvatarPopup.close();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
                editAvatarPopup.loading(false);
            });
    }
});
editAvatarPopup.setEventListeners();

// Обработчик кнопки Edit аватара пользователя
buttonOpenAvatar.addEventListener('click', () => {
    editAvatarPopup.open();
});

// Обработчик кнопки Edit попапа редактирования профиля
buttonOpenProfile.addEventListener('click', () => {
    const info = userInfo.getUserInfo();
    fillInEditProfileFormInputs({
        username: info.username,
        job: info.job
    });
    editProfilePopup.open();
});

// функционал создания новой карточки
const createCard = (data) => {
    const card = new Card({
        data: data,
        cardSelector: '.card__template',
        userId: userId,
        handleCardClick: (name, link) => {
            viewImagePopup.open(name, link);
        },
        handleDeleteIconClick: (cardId) => {
            deleteCardPopup.open();
            deleteCardPopup.submitCallback(() => {
                api.deleteCard(cardId)
                    .then(() => {
                        deleteCardPopup.close();
                        card.deleteCard();
                    })
                    .catch((err) => {
                        console.log(`Ошибка: ${err}`);
                    });
            });
        },
        handleSetLike: (cardId) => {
            api.setLike(cardId)
                .then((data) => {
                    card.handleLikeCard(data);
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                });
        },
        handleRemoveLike: (cardId) => {
            api.deleteLike(cardId)
                .then((data) => {
                    card.handleLikeCard(data);
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                });
        }
    });
    const cardElement = card.generateCard();
    return cardElement;
};

// Создание экземпляра класса Section
const cardsList = new Section({
    renderer: (card) => {
        cardsList.addItem(createCard(card));
    },
}, '.element');


// Создаем попап с подтверждением удаления карточки
const deleteCardPopup = new PopupWithConfirmation({
    popupSelector: '.popup_delete_cards'
});
deleteCardPopup.setEventListeners();

// создание попапа с формой добавления новой карточки
const addCardPopup = new PopupWithForm({
    popupSelector: '.popup_add_card',
    handleFormSubmit: (formData) => {
        addCardPopup.loading(true);
        api.addCard(formData)
            .then((formData) => {
                cardsList.addItem(createCard(formData));
                addCardPopup.close();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
                addCardPopup.loading(false);
            });
    }
});
// добавляем слушатели этому попапу:
addCardPopup.setEventListeners();

// обработчик открытия попапа
buttonOpenAddCardProfile.addEventListener('click', () => {
    addCardPopup.open();
});

// Попап просмотра изображения 
const viewImagePopup = new PopupWithImage('.popup_open_image');
viewImagePopup.setEventListeners();


// валидация формы редактирования профиля
const formEditProfileValidator = new FormValidator(settings, profileForm);
formEditProfileValidator.enableValidation();
// валидация формы добавления новой карточки
const formAddNewCardValidator = new FormValidator(settings, formElementCard);
formAddNewCardValidator.enableValidation();
// Валидация формы редактирования аватара пользователя
const formEditAvatarValidator = new FormValidator(settings, formElementAvatar);
formEditAvatarValidator.enableValidation();

