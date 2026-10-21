const express = require("express");
const pool = require("./db");

const app = express();
const PORT = 3001;

app.use(express.json());
const authRouter = require("./auth");
app.use("/api/auth", authRouter);

// Route de test de connexion a PostgreSQL
app.get("/api/test-db", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT NOW() AS heure"
        );

        res.json({
            success: true,
            message: "KOPA communique avec PostgreSQL !",
            database: "kopa_db",
            heure: result.rows[0].heure
        });
    } catch (error) {
        console.error("Erreur PostgreSQL :", error.message);

        res.status(500).json({
            success: false,
            message: "Erreur de connexion a la base de donnees."
        });
    }
});

app.listen(PORT, () => {
    console.log(`Serveur API de test lance sur http://localhost:${PORT}`);
});