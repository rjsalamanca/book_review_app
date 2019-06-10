const express = require('express'),
    router = express.Router(),
    Users = require('../models/users'),
    userController = require('../controllers/users'),
    bcrypt = require('bcryptjs');


// Gets
router.get('/', userController.user_page_get);
router.get('/login', userController.login_page_get);
router.get('/signup', userController.sign_up_get);

//Posts
router.post('/login', async (req,res) =>{
  const { email, password } = req.body

  const userInstance = new Users(null, null, null, email, password);

  try{
      let response = await userInstance.login();
      req.session.is_logged_in = true;
      req.session.first_name = response.first_name;
      req.session.last_name = response.last_name;
      req.session.user_id = response.id;

      console.log('CORRECT PW!');
      res.redirect('/users');
  }catch(err){
      console.log('WRONG PW!')
      res.redirect('/users/signup');
  }
});

router.post('/signup', async (req,res) =>{
  const { first_name, last_name, email, password} = req.body
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt)
  const userInstance = new Users(null, first_name, last_name, email, hash);

  let check = await userInstance.checkIfCreated();

  if(typeof check === 'object'){
    res.redirect('/users/login');
  } else {
    await userInstance.save().then(response =>{
        console.log('response is:', response);
        res.redirect('/');
    }).catch(err=>err)
  }
});

router.get('/logout', (req,res) =>{
  console.log('logging out');
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
