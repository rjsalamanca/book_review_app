const express = require('express'),
    router = express.Router(),
    booksController = require('../controllers/books');

// GETS
router.get('/', booksController.books_page_get);
router.get('/:bookID', booksController.single_book_page_get);

// POSTS
router.post('/:bookID', single_book_review_post);

module.exports = router;