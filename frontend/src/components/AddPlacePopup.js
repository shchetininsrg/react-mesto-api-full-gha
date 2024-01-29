import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [link, setLink] = React.useState("");
  const [name, setName] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({ name, link });
  }

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  return (
    <PopupWithForm
      name="addCard"
      title="Новое место"
      textBtn="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          placeholder="Название"
          name="name"
          className="popup__input popup__input_name"
          id="nameMesto"
          type="text"
          required
          minLength={2}
          maxLength={30}
          value={name}
          onChange={handleChangeName}
        />
        <span id="error-nameMesto" className="popup__error" />
      </label>
      <label className="popup__label">
        <input
          placeholder="Ссылка на картинку"
          name="link"
          className="popup__input popup__input_link"
          id="linkImg"
          type="url"
          required
          onChange={handleChangeLink}
          value={link}
        />
        <span id="error-linkImg" className="popup__error" />
      </label>
    </PopupWithForm>
  );
}
