import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({
  onEditProfile,
  onEditAvatar,
  onAddCard,
  onCardClick,
  onCardLike,
  cards,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="content__profile profile">
        <div className="profile__avatar-container" onClick={onEditAvatar}>
          <div
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
            className="profile__avatar"
          />
          <div className="profile__figure">
            <div className="profile__icon" />
          </div>
        </div>
        <div className="profile-info">
          <div className="profile-info__container">
            <h1 className="profile-info__fullname"> {currentUser.name} </h1>
            <p className="profile-info__description"> {currentUser.about} </p>
          </div>
          <button
            type="button"
            className="profile-info__edit-btn"
            onClick={onEditProfile}
          />
        </div>
        <button
          type="button"
          className="profile__add-btn"
          onClick={onAddCard}
        />
      </section>
      <section className="photo-cards">
        {cards.map((card) => (
          <Card
            onCardLike={onCardLike}
            onCardClick={onCardClick}
            onCardDelete={onCardDelete}
            key={card._id}
            card={card}
          />
        ))}
      </section>
    </main>
  );
}
