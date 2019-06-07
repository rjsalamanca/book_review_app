const express = require('express'),
    router = express.Router(),
    Books = require('../models/books'),
    bcrypt = require('bcryptjs');

router.get('/', async (req, res, next) => {
    const getBooks = await Books.getAll();

    res.render('template', {
        locals: {
            title: 'Books Page',
            allBooks: getBooks,
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            partial: 'partial-books'
        }
    });
});

router.get('/:bookID', async (req, res, next) => {
    const { bookID } = req.params;

    const instanceBook = new Books(bookID, null, null);
    const getBook = await instanceBook.getOneBook();
    const getBookReviews = await instanceBook.getOneBookReviews();

    res.render('template', {
        locals: {
            title: 'Books Review Page',
            book: getBook,
            allBookReviews: getBookReviews,
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            partial: 'partial-book-reviews'
        }
    });
});

router.post('/:bookID', async function(req, res) {
    
    const {review, score, id} = req.body;
    const instanceBook = new Books(id, null, null);
    
    await instanceBook.addReview(score, review, parseInt(req.session.user_id));
    
    const getBook = await instanceBook.getOneBook();
    const getBookReviews = await instanceBook.getOneBookReviews();

    res.render('template', {
        locals: {
            title: 'Books Review Page',
            book: getBook,
            allBookReviews: getBookReviews,
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            partial: 'partial-book-reviews'
        }
    });
});

module.exports = router;
