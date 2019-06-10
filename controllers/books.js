const Books = require('../models/books'); 

//GETS
exports.books_page_get = async (req, res) => {
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
}

exports.single_book_page_get = async (req, res) => {
    const { bookID } = req.params,
        instanceBook = new Books(bookID, null, null),
        getBook = await instanceBook.getOneBook(),
        getBookReviews = await instanceBook.getOneBookReviews();

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
}

exports.single_book_review_post = async function(req, res) {
    const {review, score, id} = req.body,
        instanceBook = new Books(id, null, null);
    
    await instanceBook.addReview(score, review, parseInt(req.session.user_id));
    
    const getBook = await instanceBook.getOneBook(),
        getBookReviews = await instanceBook.getOneBookReviews();

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
}