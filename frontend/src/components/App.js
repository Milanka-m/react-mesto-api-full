import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsContext } from '../contexts/CardsContext';
import { Switch, Route, Redirect, withRouter, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import api from '../utils/api';
import * as auth from '../utils/auth';

 
function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoRegisterPopupOpen, setIsInfoRegisterPopupOpen] = React.useState(false)

  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState({});
  const [currentCard, setCurrentCard] = React.useState({});

  const [cards, setCards] = React.useState([]);
  
  // стейт который отвечает залогинен пользователь или нет
  const [loggedIn, setLoggedIn] = React.useState(false);
  // стейт в котором хранится email пользователя
  const [userInfoData, setUserInfoData] = React.useState({
    email: '',
  });
  const [errorMessage, setErrorMessage] = React.useState(false);
  
  const history = useHistory();

  function handleError (error) {
    console.log(error);
  }

  React.useEffect(() => {
    checkToken();
  }, [])

  function handleLogin ({ email, password }) {
    auth.authorize(email, password)
    .then((res) => {
      localStorage.setItem('token', res.token);
      setUserInfoData({
        email: email,
      })
      setLoggedIn(true);
      history.push('/');
    })
    .catch(handleError)
  }

  // функция проверяет аутитенсифицирован ли пользователь
  // получает токен из localStorage, если он не пустой получет с сервера объект со свойством email и _id
  function checkToken () {
    const token = localStorage.getItem('token');
    if (token) {
      auth.getContent(token)
        .then(res => {
          const { email, _id } = res.user;
          setUserInfoData({
            email: email,
            _id: _id,
          })
          // пользователь залогинен
          setLoggedIn(true);
          history.push('/');
        })
        .catch(handleError)
    }
  }

  function handleRegister ({ email, password }) {
    auth.register(email, password)
      .then((res) => {
        history.push('/sign-in');
        setErrorMessage(false);
        setIsInfoRegisterPopupOpen(true);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(true);
        setIsInfoRegisterPopupOpen(true);
      })
  }

  function handleLogout () {
    // очищаем пользовательские данные
    setUserInfoData({
      email: '',
      _id: '',
    });
    // возвращаем loggedIn в первоначальное состояние
    setLoggedIn(false);
    // очищаем localStorage от токена
    localStorage.removeItem('token');
  }


  React.useEffect(() => {
    if (loggedIn) {
      checkToken();
        api.getCards()
          .then(cardsData => {
            setCards(cardsData);
          })
          .catch(handleError)
    }
  }, [loggedIn])

  React.useEffect(() => {
    if (loggedIn) {
      checkToken();
        api.getUsers()
          .then((userData) => {
            setCurrentUser(userData.user)
          })
          .catch(handleError);
    } 
  }, [loggedIn])
  
  // функция лайка и дизлайка карточки
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.card.likes.some(i => i === currentUser._id);
    if (!isLiked) {
      // Отправляем запрос в API и получаем обновлённые данные карточки
      api.addLikeCard(card.card._id, !isLiked)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card.card._id ? newCard : c));
        })
        .catch(handleError)
    } else {
            api.removeLikeCard(card.card._id, isLiked)
              .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card.card._id ? newCard : c));
              })
              .catch(handleError)
           }
  } 

  
  // функция удаления карточки
  function handleCardDelete(card) {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.removeCard(card.card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card.card._id))
      })
      .catch(handleError)
  }

  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  } 

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoRegisterPopupOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card.card);
    setIsImagePopupOpen(true);
  }

  // Обработчик api запроса для обновления профильных данных
  function handleUpdateUser(newUserData) {
    api.editUser(newUserData, userInfoData._id)
      .then(userData => {
        setCurrentUser(userData.user);
        closeAllPopups();
      })
      .catch(handleError)
  } 

  // Обработчик api запроса для обновления аватара
  function handleUpdateAvatar(data) {
    api.editAvatar(data, userInfoData._id)
      .then((userData) => {
        setCurrentUser(userData.user);
        closeAllPopups();
        })
      .catch(handleError)
  }

  // Обработчик api запроса для создания новой карточки
  function handleAddPlaceSubmit({ name, link }) {
    api.addCard({ name, link })
      .then(newCard => {
        setCurrentCard(newCard);
        setCards([newCard.card, ...cards]); 
        closeAllPopups();
      })
      .catch(handleError)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={currentCard}>
        <div className="page">
          <div className="root">
            <Header 
              email={userInfoData.email} 
              handleLogout={handleLogout} 
              loggedIn={loggedIn}
            />
            <Switch>
              <ProtectedRoute exact path="/" 
                loggedIn={loggedIn} 
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onEditProfile={handleEditProfileClick} 
                onAddPlace={handleAddPlaceClick} 
                onEditAvatar={handleEditAvatarClick} 
                onCardClick={handleCardClick}
                component={Main}>
              </ProtectedRoute>

              <Route exat path="/sign-in">
                <Login handleLogin={handleLogin} />
              </Route>

              <Route path="/sign-up">
                <Register handleRegister={handleRegister} />
              </Route>

              <Route>
                {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
              </Route>
            </Switch>

            <Footer />
          
            <InfoTooltip error={errorMessage} isOpen={isInfoRegisterPopupOpen} onClose={closeAllPopups} /> 

            <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}/>
         
            <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}/>
         
            <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />

            <PopupWithForm title="Вы уверены ?" name="removecard" nameButton="Да" />
           
            <ImagePopup 
              isOpen={isImagePopupOpen}
              card={selectedCard} 
              onClose={closeAllPopups}
              link={selectedCard.link}
              name={selectedCard.name} />
          </div>
        </div>
 
      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
