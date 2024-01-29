import { Link } from "react-router-dom";
import React from "react";

export default function Register({ onRegister }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }
  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(email, password);
  }

  return (
    <main>
      <div className="auth">
        <h2 className="auth__title">Регистрация</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="auth__input"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChangeEmail}
          />
          <input
            className="auth__input"
            type="password"
            name="password"
            placeholder="Пароль"
            value={password}
            onChange={handleChangePassword}
          />
          <button className="auth__button" type="submit">
            Зарегистрироваться
          </button>
          <p className="auth__text">
            Уже зарегистрировались?{" "}
            <Link className="auth__link" to="/sign-in">
              Войти
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
