import React from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import Login from "./Login.js";
import Register from "./Register.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import InfoTooltip from "./InfoTooltip.js";
import { api } from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRouteElement from "./ProtectedRoute.js";
import * as auth from "../utils/auth.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [email, setEmail] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isResult, setIsResult] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getDefaultCard()])
      .then(([dataUser, dataCards]) => {
        setCurrentUser(dataUser);
        setCards(dataCards);
      })
      .catch((error) => console.log(error));
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    handleCheckToken();
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleAddCardClick() {
    setIsAddCardPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(userData) {
    api
      .setInfoUser(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopup();
      })
      .catch((error) => console.log(error));
  }

  function handleUpdateAvatar(userAvatar) {
    api
      .setAvatar(userAvatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopup();
      })
      .catch((error) => console.log(error));
  }

  function handleAddPlaceSubmit(card) {
    api
      .createNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopup();
      })
      .catch((error) => console.log(error));
  }

  function handleLogin(email, password) {
    auth
      .login(email, password)
      .then((dataUser) => {
        setIsLoggedIn(true);
        navigate("/", { replace: true });
        localStorage.setItem("token", dataUser.token);
        handleCheckToken();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then(() => {
        navigate("/sign-in");
        setIsResult(true);
        setIsInfoTooltipOpen(true);
      })
      .catch((error) => {
        console.log(error);
        setIsResult(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleCheckToken() {
      const jwt = localStorage.getItem('token');
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setEmail(res.email);
            navigate("/", { replace: true });
          } else {
            setIsLoggedIn(false);
          }
        })
        .catch((err) => console.log(err));
  }

  function handleSignOut() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/sign-in", { replace: true });
  }

  function closeAllPopup() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddCardPopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.error(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id, localStorage.jwt)
      .then(() => {
        setCards((cards) =>
          cards.filter((element) => element._id !== card._id)
        );
      })
      .catch((err) => console.error(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} onSignOut={handleSignOut} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                isLoggedIn={isLoggedIn}
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddCard={handleAddCardClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                cards={cards}
                onCardDelete={handleCardDelete}
                element={Main}
              />
            }
          />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route
            path="*"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="sign-in" replace />
              )
            }
          />
        </Routes>

        <Footer />
        {/* Попап редактирования профиля */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopup}
          onUpdateUser={handleUpdateUser}
        />
        {/* Попап редактирования автара */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopup}
          onUpdateAvatar={handleUpdateAvatar}
        />
        {/* Попап добавления карточки */}
        <AddPlacePopup
          isOpen={isAddCardPopupOpen}
          onClose={closeAllPopup}
          onAddPlace={handleAddPlaceSubmit}
        />

        {/* Попап картинки */}

        <ImagePopup card={selectedCard} onClose={closeAllPopup} />

        <InfoTooltip
          isResult={isResult}
          onClose={closeAllPopup}
          isOpen={isInfoTooltipOpen}
        />

        <div className="popup" id="confirmPopup">
          <div className="popup__container">
            <button type="button" className="popup__close-btn" />
            <h2 className="popup__title">Вы уверены?</h2>
            <form
              name="deleteCard"
              className="popup__form"
              action=""
              noValidate=""
            >
              <button
                type="submit"
                id="delete-button-submit"
                className="popup__save-btn"
              >
                Да
              </button>
            </form>
          </div>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
