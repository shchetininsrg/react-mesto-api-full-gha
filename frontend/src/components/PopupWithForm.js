export default function PopupWithForm({
  name,
  title,
  textBtn,
  children,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_open" : ""}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-btn" onClick={onClose} />
        <h2 className="popup__title">{title}</h2>
        <form
          onSubmit={onSubmit}
          name={`${name}-form`}
          className="popup__form"
          action=""
          noValidate=""
        >
          {children}
          <button type="submit" className="popup__save-btn">
            {textBtn}
          </button>
        </form>
      </div>
    </div>
  );
}
