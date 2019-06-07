const db = require('./conn.js');

class Books {
    constructor(id,author,title){
        this.id = id;
        this.author = author;
        this.title = title;
    }


    static async getAll(){
        try{
            const response = await db.any(`SELECT * FROM books`);
            return response;
        } catch(err){
            return err.message;
        }
    }

    async getOneBook(){
        try{
            const response = await db.one(`SELECT * FROM books WHERE id = $1`,[this.id]);
            return response;
        } catch(err){
            return err.message;
        }
    }

    async getOneBookReviews(){
        try{
            const response = await db.any(`
                SELECT BOOK.id, BOOK.title, REV.review, REV.score,  U.first_name
                FROM books AS BOOK, reviews AS REV,  users AS U
                WHERE REV.book_id = $1 AND BOOK.id = $1 AND REV.user_id = U.id ORDER BY BOOK.id`, [this.id]);
            return response;
        } catch(err){
            return err.message;
        }
    }

    async addReview(score,review,userID){
        try{
            const response = await db.any(
                `INSERT INTO reviews (review, score, book_id, user_id) 
                VALUES ($1,$2,$3,$4)`,[review, score, this.id, userID]
            );
            return response;
        } catch(err){
            return err.message;
        }
    }
}

module.exports = Books;