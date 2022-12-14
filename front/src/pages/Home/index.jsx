import React, { useState } from 'react';
import styled from 'styled-components';
import colors from '../../utils/style/colors';
import axios from 'axios';
import { Link } from 'react-router-dom'
import logo from '../../assets/favicon.webp';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal)

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
  width: 300px;
  border-radius: 5px;
  background-color: ${colors.primary};
    :focus{
      background-color: #1A2C38;
    }
    :hover{
      border-color: ${colors.tertiary};
    }
`

const Show = styled.button`
  background-color: ${colors.primary};
  height: 30px;
  width: 65px;
  margin: -49px 0 0 250px;
  border-radius: 5px;
  cursor: pointer;
    :hover{
      color: cyan;
      border-color: cyan;
    }
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
    :hover{
      color: #37FF8B;
      border-color: #37FF8B;
    }
`

const Sign = styled.span`
  color: ${colors.tertiary};
  :hover{
    color: cyan;
  }
`

function Login() {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const formSubmitHandler = (event) => {
    event.preventDefault();

   
  axios.post('http://localhost:5000/api/auth/signUp', {

    email,
    password,
  })
  .then ((res) =>{
    if (res.status === 401){
      console.log(res);
    } else {
      window.location="/Accueil";
      localStorage.setItem('userdata', JSON.stringify(res.data))
        localStorage.setItem('token', (res.data.token))
        localStorage.setItem('userId', (res.data.userId))
        localStorage.setItem('pseudo', (res.data.pseudo))
        console.log(res.data)
    }
  })
  .catch((err) => {
    console.log(err);
    MySwal.fire({
      title: 'Erreur!',
      text: 'V??rifiez vos donn??es saisies dans le formulaire',
      icon: 'error',
      confirmButtonText: 'Fermer',
    })
  });
  }
    return (
      <div>
        <Formulaire onSubmit={formSubmitHandler}>
        <BlocForm>
          <FormTitle>Vous semblez familier</FormTitle>
          <ImgLogo src={logo} alt="logo" />
          <div id="msgErr"></div>
            <FormValue htmlFor="email">Email</FormValue>
            <FormInput type="text" placeholder="Email"  onChange={(event) => setEmail(event.target.value)} required/>
            <FormValue htmlFor="password">Mot de Passe</FormValue>
            <FormInput type={passwordIsVisible ? 'text' : 'password'} placeholder="Mot de Passe" onChange={(event) => setPassword(event.target.value)} required/>
            <Show type="button" onClick={() => setPasswordIsVisible(!passwordIsVisible)}>
              {passwordIsVisible ? 'Cacher' : 'Montrer'}
            </Show>
            <p>Pas de compte ? <Link to="/SignIn"><Sign>Inscrivez-vous ici</Sign></Link></p>
            <Log id="error" type="submit">Se connecter</Log>
        </BlocForm>
        </Formulaire>
      </div>
    )
  
    }
  
export default Login