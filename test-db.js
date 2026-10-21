const pool = require("./db");

async function testConnection() {
    try {
        const result = await pool.query("SELECT NOW() AS heure");

        console.log("CONNEXION PostgreSQL REUSSIE !");
        console.log("Heure du serveur :", result.rows[0].heure);
    } catch (error) {
        console.error("ERREUR :", error.message);
    } finally {
        await pool.end();
    }
}

testConnection();