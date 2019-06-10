const express = require('express'),
    router = express.Router(),
    Books = require('../models/books'),
    booksController = require('../controllers/books');

// GETS
router.get('/', booksController.books_page_get);
router.get('/:bookID', booksController.single_book_page_get);

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
