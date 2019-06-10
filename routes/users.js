const express = require('express'),
    router = express.Router(),
    userController = require('../controllers/users');

// Gets
router.get('/', userController.user_page_get);
router.get('/login', userController.login_page_get);
router.get('/signup', userController.sign_up_get);
router.get('/logout', userController.logout);

//Posts
router.post('/login', userController.login_page_post);
router.post('/signup', userController.sign_up_post);

module.exports = router;