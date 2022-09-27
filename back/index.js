const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');

const app = express();
dotenv.config() ;
app.use(express.json());
app.use(helmet());
app.use(cors());

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.CONNECTION_URL ;

mongoose.connect ( CONNECTION_URL  , {
  useNewUrlParser : true ,
  useUnifiedTopology : true
}).then( () => {
  console.log( "Connexion réussi ! Vous êtes à présent en relation avec la base de données" ) ;
}).catch( ( err ) => console.log ( err.message ) ) ;

app.use(cors());

app.listen ( PORT , ( req , res ) => {
    console.log ( "Le server est sur le port " , PORT ) ;
  }) ;