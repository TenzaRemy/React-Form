const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const secret = process.env.TOKEN;

module.exports = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, secret);
      const userId = decodedToken.userId;
      if (req.body.userId && req.body.userId !== userId) {
          throw new Error('Utilisateur non autorisé');    
      } else {
        next();
      }
    } catch {res.status(401).json({error: 'Accès non autorisé'});
    }
  };