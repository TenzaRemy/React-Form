import React, { useState } from 'react';
import styled from 'styled-components';
import colors from '../../utils/style/colors';
import Header from '../../components/Header';
import axios from 'axios';
import { Link } from 'react-router-dom'

const Formulaire = styled.div`
  border-radius: 20px;
  border: 2px solid ${colors.tertiary};
  box-shadow: 6px 7px 7px 6px ${colors.secondary};
  padding: 10px 10px 0;
  width: 50%;
  margin: 70px auto;
  background-color: ${colors.secondary};
    @media only screen and (max-width: 768px) {
      width: 94%;
      display: flex;
      position: absolute;
      left: 0%;
    }
`

const BlocForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  `

const FormTitle = styled.h1`
  display: flex;
  justify-content: center; 
`
const FormInput =  styled.input`
  padding: 5px;
  margin: 10px 0 15px 0;
  width: 250px;
  border-radius: 10px;
  background-color: #f5f5f5;
`

const Show = styled.button`
  background-color: ${colors.secondary};
  height: 25px;
  width: 65px;
  margin: -43px 0 0 193px;
  border-radius: 10px;
`

const FormValue = styled.label`
  font-weight: 600;
`

const Log = styled.button`
  border-radius: 20px;
  background: rgb(78,81,102);
  background: linear-gradient(160deg, rgba(78,81,102,1) 66%, rgba(255,215,215,1) 120%); 
  width: 33%;
  padding: 10px;
  margin: 20px 0 0 0;
  box-shadow: -1px 2px 2px 3px lightgray;
  display: flex;
  justify-content: center;
  align-self: center;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  @media only screen and (max-width: 768px) {
    width: 40%;
  }
`

const Sign = styled.span`
  color: ${colors.primary};
`

function Login() {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const formSubmitHandler = (event) => {
    event.preventDefault();

   
  axios.post('http://localhost:5000/api/auth/login', {

    email,
    password,
  })
  .then ((res) =>{
    if (res.status === 401){
      console.log(res);
    } else {
      window.location="/Blog";
      localStorage.setItem('userdata', JSON.stringify(res.data))
        localStorage.setItem('token', (res.data.token))
        localStorage.setItem('userId', (res.data.userId))
        localStorage.setItem('pseudo', (res.data.pseudo))
        console.log(res.data)
    }
  })
  .catch ((err) => {
    alert('Les données saisies ne correspondent à aucun compte. Veuillez vérifier votre Adresse mail et/ou votre mot de passe.');
      console.log(err);
  })
  }
    return (
      <div>
        <Header/>
        <Formulaire onSubmit={formSubmitHandler}>
        <BlocForm>
          <FormTitle>Connectez vous dès maintenant !</FormTitle>
            <FormValue htmlFor="email">- Email -</FormValue>
            <FormInput type="text" placeholder="Email"  onChange={(event) => setEmail(event.target.value)} required/>
            <FormValue htmlFor="password">- Mot de Passe -</FormValue>
            <FormInput type={passwordIsVisible ? 'text' : 'password'} placeholder="Mot de Passe" onChange={(event) => setPassword(event.target.value)} required/>
            <Show type="button" onClick={() => setPasswordIsVisible(!passwordIsVisible)}>
              {passwordIsVisible ? 'Cacher' : 'Montrer'}
            </Show>
            <p>Pas de compte ? <Link to="/SignIn"><Sign>Inscrivez-vous ici</Sign></Link></p>
            <Log type="submit">Se connecter</Log>
        </BlocForm>
        </Formulaire>
      </div>
    )
  
    }
  
export default Login