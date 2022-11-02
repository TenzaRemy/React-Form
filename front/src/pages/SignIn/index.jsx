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

const FormInputDob =  styled.input`
  padding: 10px;
  margin: 10px 15px 15px 10px;
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
  margin: -49px 0 20px 250px;
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
const FormSelect = styled.select`
    background-color: ${colors.primary};
    border-radius: 5px;
    margin: 10px;
    padding: 10px;
    :focus{
      background-color: #1A2C38;
    }
    :hover{
      border-color: ${colors.tertiary};
    }
`

const FormGroup = styled.div`
    
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

function Form() {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  
  const [pseudo, setPseudo] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [sexe, setSexe] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const formSubmitHandler = (event) => {
    event.preventDefault();

   
  axios.post('http://localhost:5000/api/auth/signIn', {

    pseudo,
    birthDate,
    sexe,
    email,
    password,
  })
  .then((res) => {
    if (res.status === 400) {
    console.log(res);
    } else {
      MySwal.fire({
        title: 'Vous avez réussi !',
        text: 'Vous êtes bien inscrit ! Veuillez dès à présent vous connecter',
        icon: 'success',
        confirmButtonText: 'Fermer'
      })
        localStorage.setItem('userdata', JSON.stringify(res.data))
        localStorage.setItem('token', (res.data.token))
    }
  })
  .catch((err) => {
    console.log(err);
    MySwal.fire({
      title: 'Erreur!',
      text: 'Vérifiez vos données saisies dans le formulaire',
      icon: 'error',
      confirmButtonText: 'Fermer'
    })
  });
}

    return (
      <div>
        <Formulaire onSubmit={formSubmitHandler}>
        <BlocForm>
          <FormTitle>Bienvenu !</FormTitle>
          <ImgLogo src={logo} alt="logo" />
            <FormValue htmlFor="Pseudo">Pseudo</FormValue>
              <FormInput type="text" placeholder="Votre pseudo" onChange={(event) => setPseudo(event.target.value)} minLength={2} maxLength={16} required/>
              <FormGroup>
            <FormValue htmlFor='date'>Age</FormValue>
              <FormInputDob type="date" onChange={(event) => setBirthDate(event.target.value)} required/>
            <FormValue htmlFor='sexe'>Sexe</FormValue>
            <FormSelect onChange={(event) => setSexe(event.target.value)} required>       
              <option value=""></option>
              <option value="Homme">Homme</option>
              <option value="Femme">Femme</option>
              <option value="Autre">Autre</option>
            </FormSelect>
              </FormGroup>
            <FormValue htmlFor="email">Email</FormValue>
              <FormInput id="email"type="email" placeholder="Email" onChange={(event) => setEmail(event.target.value)}  required/>
            <FormValue  htmlFor="password">Mot de Passe</FormValue>
              <FormInput id="mdp" type={passwordIsVisible ? 'text' : 'password'} placeholder="Mot de Passe" onChange={(event) => setPassword(event.target.value)} required/>
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