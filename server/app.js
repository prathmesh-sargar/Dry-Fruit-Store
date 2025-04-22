import express from 'express';
import cors from 'cors';
import { checkConnection } from './src/config/db.js';
import productRoutes from './src/routes/productRoutes.js';

const app = express();
const port = 3000;

app.use(cors()); 
app.use(express.json()); 

app.use('/food', express.static('src/public/img/food'));


app.use("/api", productRoutes);

app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
    try {
        await checkConnection();
    } catch (error) {
        console.log("Database connection failed", error);
    }
});
