import { pool } from "../config/db.js";

// Fetch all products (frontend will filter)
const getProducts = async () => {
    try {
        const [rows] = await pool.query("SELECT * FROM products");
        return rows;
    } catch (error) {
        console.log("Error fetching products:", error);
        throw error;
    }
};

const getProductsByCategory = async (category) => {
    try {
        const [rows] = await pool.query("SELECT * FROM products WHERE category = ?", [category]);
        return rows;
    } catch (error) {
        console.log("Error fetching products:", error);
        throw error;
    }
};
export { getProducts,getProductsByCategory};
