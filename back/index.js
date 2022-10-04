const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');

const userRoutes = require('./routes/user');

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
}).then(() => {
  console.log( "Connexion réussi ! Vous êtes à présent en relation avec la base de données" ) ;
}).catch(() => console.log ( "Connexion à MongoDB échoué" ) ) ;

app.use(cors());

app.use('/api/auth', userRoutes); 

app.listen ( PORT , ( req , res ) => {
    console.log ( "Le server est sur le port " , PORT ) ;
  }) ;