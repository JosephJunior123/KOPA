const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("./db");

const router = express.Router();

// TEST : vérifier la connexion à la base de données
router.get("/test", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT COUNT(*)::int AS total FROM users"
        );

        res.json({
            success: true,
            message: "Module d'authentification KOPA prêt.",
            usersCount: result.rows[0].total
        });
    } catch (error) {
        console.error("Erreur auth :", error.message);

        res.status(500).json({
            success: false,
            message: "Impossible de vérifier les utilisateurs."
        });
    }
});

// INSCRIPTION D'UN UTILISATEUR
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Vérifier les champs obligatoires
        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string" ||
            !name.trim() ||
            !email.trim() ||
            !password
        ) {
            return res.status(400).json({
                success: false,
                message: "Veuillez remplir tous les champs."
            });
        }

        const cleanName = name.trim();
        const cleanEmail = email.trim().toLowerCase();

        if (cleanName.length > 100 || cleanEmail.length > 255) {
            return res.status(400).json({
                success: false,
                message: "Le nom ou l'adresse e-mail est trop long."
            });
        }

        if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)
        ) {
            return res.status(400).json({
                success: false,
                message: "Adresse e-mail invalide."
            });
        }

        if (Buffer.byteLength(password, "utf8") > 72) {
            return res.status(400).json({
                success: false,
                message: "Le mot de passe est trop long."
            });
        }

        if (password.length < 12) {
            return res.status(400).json({
                success: false,
                message: "Le mot de passe doit contenir au moins 12 caractères."
            });
        }

        // Vérifier si l'adresse e-mail existe déjà
        const existingUser = await pool.query(
            "SELECT id FROM users WHERE email = $1",
            [cleanEmail]
        );

        if (existingUser.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Cette adresse e-mail est déjà utilisée."
            });
        }

        // Hacher le mot de passe avant de le stocker
        const passwordHash = await bcrypt.hash(password, 12);

        // Enregistrer l'utilisateur dans PostgreSQL
        const result = await pool.query(
            `INSERT INTO users (name, email, password_hash)
             VALUES ($1, $2, $3)
             RETURNING id, name, email, created_at`,
            [cleanName, cleanEmail, passwordHash]
        );

        return res.status(201).json({
            success: true,
            message: "Compte KOPA créé avec succès !",
            user: result.rows[0]
        });

    } catch (error) {
        // Protection supplémentaire contre les inscriptions simultanées
        if (error.code === "23505") {
            return res.status(409).json({
                success: false,
                message: "Cette adresse e-mail est déjà utilisée."
            });
        }

        console.error("Erreur inscription :", error.message);

        return res.status(500).json({
            success: false,
            message: "Impossible de créer le compte pour le moment."
        });
    }
});
// CONNEXION D'UN UTILISATEUR
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (
            typeof email !== "string" ||
            typeof password !== "string" ||
            !email.trim() ||
            !password
        ) {
            return res.status(400).json({
                success: false,
                message: "Veuillez saisir votre e-mail et votre mot de passe."
            });
        }

        const cleanEmail = email.trim().toLowerCase();

        // Rechercher le compte dans PostgreSQL
        const result = await pool.query(
            `SELECT id, name, email, password_hash
             FROM users
             WHERE email = $1`,
            [cleanEmail]
        );

        // Utiliser le même message pour les identifiants incorrects
        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: "E-mail ou mot de passe incorrect."
            });
        }

        const user = result.rows[0];

        // Comparer le mot de passe avec son hachage
        const passwordMatches = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!passwordMatches) {
            return res.status(401).json({
                success: false,
                message: "E-mail ou mot de passe incorrect."
            });
        }

        const secret = process.env.JWT_SECRET;

        if (!secret || secret.length < 32) {
            console.error("JWT_SECRET absent ou trop court.");

            return res.status(500).json({
                success: false,
                message: "Le service de connexion n'est pas configuré."
            });
        }

        // Créer un jeton d'authentification
        const token = jwt.sign(
            { sub: String(user.id) },
            secret,
            { expiresIn: "15m", issuer: "kopa-api", audience: "kopa-users" }
        );

        return res.json({
            success: true,
            message: "Connexion réussie !",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Erreur connexion :", error.message);

        return res.status(500).json({
            success: false,
            message: "Impossible de se connecter pour le moment."
        });
    }
});
module.exports = router;