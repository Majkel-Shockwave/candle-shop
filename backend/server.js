//1. Importy
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

//2. Tworzymy aplikację express (wynik funkcji express to obiekt z wbudowanymi metodami własnymi)
const app = express();
app.use(cors());

//3. Middleware do obsługi json
app.use(express.json());

//4. Połączenie z bazą danych PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'candleshop',
    password: 'Kikinowy16031990',
    port: 5432
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