const express = require('express');

const router = express.Router();

const UserController = require('./controllers/UserControllers')
const AddressController = require('./controllers/AddressController')

const authMiddleware = require('./middlewares/auth')

// Defina suas rotas aqui
router.get('/users', authMiddleware, UserController.index);

router.post('/users', UserController.store);

router.put('/users/:user_id', UserController.update);

router.delete('/users/:user_id', UserController.delete);

router.post('/users/login', UserController.login);


/*----------------------------ADDRESS-------------------------------------------*/

router.use(authMiddleware);

router.get('/users/:user_id/address', AddressController.index);
router.post('/users/:user_id/address', AddressController.store);
router.delete('users/:id/address', AddressController.delete);

// Exporte o router para ser usado em outros lugares
module.exports = router;