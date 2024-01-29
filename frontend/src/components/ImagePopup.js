export default function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_image ${card ? "popup_open" : ""}`}>
      <div className="popup__container popup__container_img">
        <img
          className="popup__img"
          src={card ? card.link : ""}
          alt={card ? card.name : ""}
        />
        <p className="popup__text">{card ? card.name : ""}</p>
        <button type="button" className="popup__close-btn" onClick={onClose} />
      </div>
    </div>
  );
}
