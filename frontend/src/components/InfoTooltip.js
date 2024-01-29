import success from "../images/success.svg";
import fail from "../images/fail.svg";
export default function InfoTooltip({ onClose, isOpen, isResult }) {
  return (
    <div className={`popup ${isOpen ? "popup_open" : ""}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-btn" onClick={onClose} />
        <img
          className="popup__img-info"
          alt="Результат регистрации"
          src={isResult ? success : fail}
        />
        <h2 className="popup__title-info">
          {isResult
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </div>
  );
}
