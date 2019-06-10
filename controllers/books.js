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
}