const express = require('express'),
    router = express.Router(),
    Books = require('../models/books'),
    bcrypt = require('bcryptjs');

router.get('/', async (req, res, next) => {

    res.render('template', {
        locals: {
            title: 'Books Page',
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            partial: 'partial-books'
        }
    });
});

module.exports = router;
