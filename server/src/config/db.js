import mysql2 from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config();


const pool = mysql2.createPool({

    host: "localhost",
    user: "root",
    password: process.env.PassWord,
    database:process.env.DataBase_Name,
    connectionLimit:10,
    queueLimit:0,
    waitForConnections: true
    
})


const checkConnection = async()=>{
    try {
        const connection = await pool.getConnection();
        console.log("Connected successfully to DB");
        connection.release();
        
    } catch (error) {
        console.log( "error connecting to database ok " ,error);
        
    }
}   

export {pool, checkConnection}
