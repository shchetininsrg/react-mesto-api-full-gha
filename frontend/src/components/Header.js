import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import logo from "../images/vector.svg";

export default function Header({ email, onSignOut }) {
  return (
    <header className="page__header header">
      <img className="header__logo" src={logo} alt="Логтип Mesto" />
      <Routes>
        <Route
          path="/sign-in"
          element={
            <Link className="header__link" to="/sign-up">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link className="header__link" to="/sign-in">
              Войти
            </Link>
          }
        />
        <Route
          path="/"
          element={
            <div className="header__user">
              <p className="header__email">{email}</p>
              <Link className="header__link" onClick={onSignOut}>
                Выйти
              </Link>
            </div>
          }
        />
      </Routes>
    </header>
  );
}
