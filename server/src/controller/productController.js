import { getProducts,getProductsByCategory } from "../utils/dbutils.js";


// Controller to get all products
const fetchAllProducts = async (req, res) => {
    try {
        const products = await getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products" });
    }
};



const fetchProductsByCategory = async (req, res) => {
    try {
        const category = req.query.category; // Get category from query params
        if (!category) {
            return res.status(400).json({ message: "Category is required" });
        }

        const products = await getProductsByCategory(category);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}


export { fetchAllProducts, fetchProductsByCategory};
