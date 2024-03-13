const express = require('express');
const {login, Register, Dashboard} = require('../controllers/userController');
const middleware = require('../middleware');
 
const expressRouter = express.Router();
 
expressRouter.post('/register',Register);

expressRouter.post('/login',login);
expressRouter.get('/myprofile',middleware,Dashboard);
 
module.exports = expressRouter;