const express = require('express');
const {login, Register, Dashboard, getAllUsers, updateUserProfile, getAllUsersById} = require('../controllers/userController');
const middleware = require('../middleware');
 
const expressRouter = express.Router();

 
expressRouter.post('/register',Register);
expressRouter.get('/users', getAllUsers);
expressRouter.get('/users/:id', getAllUsersById);
expressRouter.post('/login',login);
expressRouter.get('/myprofile',middleware,Dashboard);
expressRouter.put('/profile', middleware, updateUserProfile);

module.exports = expressRouter;