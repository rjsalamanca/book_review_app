const db = require('./conn.js');

class Books {
    constructor(id,author,title){
        this.id = id;
        this.author = author;
        this.title = title;
    }


    static async getAll(){
        const query = `SELECT * FROM books`;
        try{
            const response = await db.result(query);
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
                SELECT REST.id, REST.name, REV.context, REV.score,  U.first_name
                FROM books AS REST, reviews AS REV,  users AS U
                WHERE REV.restaurant_id = $1 AND REST.id = $1 AND REV.userid = U.id ORDER BY REST.id`, [this.id]);
            return response;
        } catch(err){
            return err.message;
        }
    }

    async addReview(score,review,userID){
        try{
            const response = await db.any(
                `INSERT INTO reviews (score, context, restaurant_id, userid) 
                VALUES ($1,$2,$3,$4)`,[score,review,this.id,userID]
            );
            return response;
        } catch(err){
            return err.message;
        }
    }
}

async function getQuery(query){
    try{
        const response = await db.result(query);
        return response;
    } catch(err){
        return err.message;
    }
}

module.exports = Books;