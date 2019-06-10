const Users = require('../models/users');

exports.user_page_get = async (req, res) => {
    const userInstance = new Users(req.session.user_id,null, null,null,null);
    const getUserInfo = await userInstance.getUserInfo();
    const getAllUserReviews = await userInstance.getOneUserReviews();

    res.render('template', {
        locals: {
            title: 'Users Page',
            userInfo: getUserInfo,
            userReviews: getAllUserReviews,
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            partial: 'partial-users'
        }
    });
}

exports.login_page_get = (req,res) => {
    res.render('template', {
        locals:{
            title: 'Login Page',
            is_logged_in:req.session.is_logged_in
        },
        partials: {
            partial: 'partial-login-form'
        }
    });
}

exports.sign_up_get = (req,res) => {
    res.render('template', {
        locals:{
            title: 'Sign Up Page',
            is_logged_in:req.session.is_logged_in
        },
        partials: {
            partial: 'partial-signup-form'
        }
    });
}
