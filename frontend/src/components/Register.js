import React from 'react';
import { Link } from 'react-router-dom';

function Register ({ handleRegister }) {
  const [data, setData] = React.useState({
    email: '',
    password: '',
    message: ''
  })
  
  function handleChange(e) {
    const {name, value} = e.target;
    setData({
      ...data,
      [name]: value 
    });
  }
  function handleSubmit(e){
    e.preventDefault();
    if (!data.email || !data.password){
      return;
    }
    const { email, password } = data;
    handleRegister({ email, password });

  }
  
    return (
      <div className="auth">
        <form className="auth__form" onSubmit={handleSubmit}>
          <div className="auth__form-container">
            <h2 className="auth__form-title">Регистрация</h2> 
            <fieldset className="auth__form-input-container">
              <section className="auth__form-section">
                <input className="auth__form-input" type="email" value={data.email} onChange={handleChange} name="email" id="email" placeholder="Email" required />
                <span className="popup__form-input-error" id="email-error"></span>
              </section>
              <section className="auth__form-section">
                <input className="auth__form-input" type="password" value={data.password} onChange={handleChange} name="password" id="password" placeholder="Пароль" required />
                <span className="popup__form-input-error" id="password-error"></span>
              </section>
            </fieldset>
          </div>
          <fieldset className="popup__form-handlers">
              <button type="submit" className="auth__form-button link">Зарегистрироваться</button>
          </fieldset>
          <fieldset className="auth__signin">
            <p className="auth__title-signin">Уже зарегистрированы?</p>
            <Link to="/sign-in" className="auth__link-signin link">Войти</Link>
          </fieldset>
        </form>
      </div>
    )
 
}

export default Register;