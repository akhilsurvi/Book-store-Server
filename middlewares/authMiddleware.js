const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(403).send('Token required');
    
    const token = authHeader.split(' ')[1];  // Remove "Bearer" prefix
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(401).send('Invalid token');
      req.user = user;
      next();
    });
  
};
