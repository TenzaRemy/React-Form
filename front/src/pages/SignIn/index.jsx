import React, { useState } from 'react';
import styled from 'styled-components';
import colors from '../../utils/style/colors';
import axios from 'axios';
import { Link } from 'react-router-dom'
import logo from '../../assets/favicon.webp';


const Formulaire = styled.div`
  width: 100%;
  margin: auto;
  background-color: ${colors.primary};
  
`

const BlocForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto;
  `

const FormTitle = styled.h1`
  display: flex;
  justify-content: center; 
  margin: 0;
`

const ImgLogo = styled.img`
  height: 100px;
  padding: 20px;
`

const FormInput =  styled.input`
  padding: 10px;
  margin: 10px 0 15px 0;
  width: 250px;
  border-radius: 5px;
  background-color: ${colors.secondary};
`

const Show = styled.button`
  background-color: ${colors.secondary};
  height: 30px;
  width: 65px;
  margin: -49px 0 20px 200px;
  border-radius: 5px;
`

const FormValue = styled.label`
  font-weight: 600;
`

const Log = styled.button`
  border-radius: 20px;
  background: ${colors.primary};
  padding: 10px 25px;
  margin: 20px 0 0 0;
  display: flex;
  justify-content: center;
  align-self: center;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
`
const Sign = styled.span`
  color: ${colors.tertiary};
`

function Form() {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  
  const [pseudo, setPseudo] = useState('');
  const [sexe, setSexe] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const formSubmitHandler = (event) => {
    event.preventDefault();

   
  axios.post('http://localhost:5000/api/auth/signIn', {

    pseudo,
    sexe,
    email,
    password,
  })
  .then((res) => {
    if (res.status === 400) {
    console.log(res);
    } else {
      window.location = "/";
        localStorage.setItem('userdata', JSON.stringify(res.data))
        localStorage.setItem('token', (res.data.token))
    }
  })
  .catch((err) => {
    console.log(err);
    alert('Vérifier vos données saisies.');
  });
}

    return (
      <div>
        <Formulaire onSubmit={formSubmitHandler}>
        <BlocForm>
          <FormTitle>Bienvenu</FormTitle>
          <ImgLogo src={logo} alt="logo" />
            <FormValue htmlFor="Pseudo">Pseudo</FormValue>
            <FormInput type="text" placeholder="Votre pseudo" onChange={(event) => setPseudo(event.target.value)} minLength={2} maxLength={16} required/>
            <FormValue htmlFor='sexe'>Sexe</FormValue>
            <FormInput type="text" placeholder='Homme ou Femme' onChange={(event) => setSexe(event.target.value)} required/>
            <FormValue htmlFor="email">Email</FormValue>
            <FormInput type="text" placeholder="Email" onChange={(event) => setEmail(event.target.value)}  required/>
            <FormValue htmlFor="password">Mot de Passe</FormValue>
            <FormInput type={passwordIsVisible ? 'text' : 'password'} placeholder="Mot de Passe" onChange={(event) => setPassword(event.target.value)} required/>
            <Show type="button" onClick={() => setPasswordIsVisible(!passwordIsVisible)}>
            {passwordIsVisible ? 'Cacher' : 'Montrer'}
            </Show>
            <p>Déjà un compte ? <Link to="/"><Sign>Connectez-vous ici</Sign></Link></p>
            <Log type="submit">S'inscrire</Log>
        </BlocForm>
        </Formulaire>
      </div>
    )
  }

  
export default Form