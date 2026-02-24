//1. Importy
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();


//2. Tworzymy aplikację express (wynik funkcji express to obiekt z wbudowanymi metodami własnymi)
const app = express();
app.use(cors());

//3. Middleware do obsługi json
app.use(express.json());

//4. Połączenie z bazą danych PostgreSQL
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


//5. Endpoint testowy
app.get('/', (req, res) => {
    res.send('backend działa!');
});

//6. Endpoint z bazy danych
app.get('/produkty', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT * FROM products
            ORDER BY price DESC
            LIMIT 8
            `);
        res.json(result.rows);
    } catch (err) {
        console.log(err);
        res.status(500).send("Błąd servera");
    }
});

app.listen(3000, () => {
    console.log('Server działa na http://localhost:3000');
});

app.get('/produkty/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query (
            'SELECT * FROM products WHERE id=$1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).send("Nie znaleziono produkty")
        }

        res.json(result.rows[0]);

    } catch (err) {
        console.log(err);
        res.status(500).send("Błąd serwera");
    }
});

app.get('/produkty/podobne/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const productResult = await pool.query(
            'SELECT * FROM products WHERE id = $1',
            [id]
        );

        if (productResult.rows.length === 0) {
            return res.status(404).send("Nie znaleziono produktu");
        }

        const category = productResult.rows[0].category_id;

        const relatedResult = await pool.query(
            `SELECT * FROM products WHERE category_id = $1 AND id != $2
            LIMIT 8`,
            [category, id]
        );

        res.json(relatedResult.rows);

    }catch (err) {
        res.status(500).json({ error: "Błąd servera" });
    }
});