import React from 'react';
import {Switch, Link, Route } from 'react-router-dom';

function Header({ email, handleLogout }) {
  return (
    <header className="header">
      <a href="#" className="header__logo link" target="_self" rel="noopener"></a>
      <Switch>
        <Route exact path="/">
          <ul className="header__nav">
            <li><Link to="sign-in" className="header__link link">{email}</Link></li>
            <li><button onClick={handleLogout} className="header__button link">Выйти</button></li>
          </ul>
        </Route>
        <Route path="/sign-up">
          <Link className="header__link link" to="sign-in">Войти</Link>
        </Route>
        <Route path="/sign-in">
          <Link className="header__link link" to="sign-up">Регистрация</Link>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;