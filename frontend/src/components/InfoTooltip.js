import React from 'react';
import iconErrorAuth from '../images/icon-auth-error.svg';
import iconRegisterAuth from '../images/icon-auth-login.svg';

function InfoTooltip ({ error, isOpen, onClose }) {
  const popupOpened = `${isOpen && 'popup_opened'}`;
  
  return (
    <div className={`popup ${popupOpened}`}>
      <div className="popup__container">
        <button className="popup__close link" type="button" aria-label="Закрыть попап" onClick={onClose}></button>
        <img className="popup__info-icon" src={error ? iconErrorAuth : iconRegisterAuth} alt="изображение"/>
        <p className="popup__info-text">{error ? "Что-то пошло не так!" : "Вы успешно зарегистрировались!"}</p>
      </div>
    </div>
    
  );
}

export default InfoTooltip;
