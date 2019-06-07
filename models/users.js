const db = require('./conn.js'),
    bcrypt = require('bcryptjs');

class Users {
    constructor(id,first_name,last_name,email,password){
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.checkPassword = (hash) => bcrypt.compareSync(this.password, hash);
    }

    async checkIfCreated(){
        try{
            const response = await db.one(`SELECT email FROM users WHERE email = $1`, [this.email]);
            return response;
        } catch(err){
            return err.message;
        }
    }

    async getUserInfo(){
        try{
            const response = await db.one(`SELECT id, first_name, last_name, email FROM users WHERE id = $1`,[this.id]);
            console.log(response)
            return response;
        } catch(err){
            return err.message;
        }
    }

    async save(){
        try{
            const response = await db.one(`
                INSERT INTO users (
                    first_name,last_name,email,password) 
                VALUES
                    ($1,$2,$3,$4)
                returning id`, 
                [this.first_name,this.last_name,this.email,this.password]);
            console.log('USER WAS CREATED WITH ID: ', response.id);

            return response;
        } catch(err){
            return err.message;
        }
    }

    async getOneUserReviews(){
        try{
            const response = await db.any(`
                SELECT BOOK.id, BOOK.title, BOOK.author, REV.review, REV.score, U.id
                FROM books AS BOOK, reviews AS REV,  users AS U
                WHERE REV.user_id = $1 AND U.id = $1 AND BOOK.id = REV.book_id ORDER BY BOOK.id`, [this.id]);
            return response;
        } catch(err){
            return err.message;
        }
    }

    async login(){
        try{
            const response = await db.one(`
                SELECT id, first_name, last_name, password FROM users
                WHERE email = $1`, 
                [this.email]);

            if(!this.checkPassword(response.password)){
                throw new Error('WRONG PASSWORD');
            } else {
                return response;
            }

        } catch(err){
            return Promise.reject(err);
        }
    }
}

module.exports = Users;