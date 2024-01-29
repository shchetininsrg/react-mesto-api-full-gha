import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `photo-cards__like ${
    isLiked && "photo-cards__like_active"
  }`;

  const handleCardClick = () => {
    onCardClick(card);
  };

  const handleCardLike = () => {
    onCardLike(card);
  };
  const handleCardDeete = () => {
    onCardDelete(card);
  };

  return (
    <div className="photo-cards__item">
      {isOwn && (
        <button onClick={handleCardDeete} className="photo-cards__bucket" />
      )}
      <img
        className="photo-cards__img"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className="photo-cards__text-container">
        <h2 className="photo-cards__title">{card.name}</h2>
        <div className="photo-card__container-like">
          <button
            onClick={handleCardLike}
            type="button"
            className={cardLikeButtonClassName}
          />
          <p className="photo-card__like-count">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}
