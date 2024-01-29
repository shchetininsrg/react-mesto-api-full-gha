import React from "react";

export default function Login({ onLogin }) {
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
    onLogin(email, password);
  }
  return (
    <main>
      <div className="auth">
        <h2 className="auth__title">Вход</h2>
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
            Войти
          </button>
        </form>
      </div>
    </main>
  );
}
