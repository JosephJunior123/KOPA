// ===== SERVEUR KOPA =====

const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer(function(req, res) {

    // Autoriser notre page KOPA à communiquer avec le serveur
    res.setHeader(
        "Access-Control-Allow-Origin",
        "*"
    );

    // ===== TEST DU SERVEUR =====

    if (
        req.method === "GET" &&
        req.url === "/"
    ) {

        res.setHeader(
            "Content-Type",
            "application/json; charset=utf-8"
        );

        res.writeHead(200);

        res.end(
            JSON.stringify({
                success: true,
                message: "🔥 Serveur KOPA opérationnel !"
            })
        );

        return;
    }


    // ===== TEST PAIEMENT =====

    if (
        req.method === "POST" &&
        req.url === "/payment-test"
    ) {

        res.setHeader(
            "Content-Type",
            "application/json; charset=utf-8"
        );

        res.writeHead(200);

        res.end(
            JSON.stringify({
                success: true,
                message: "✅ Demande de paiement reçue par KOPA."
            })
        );

        return;
    }


    // ===== SERVIR LES FICHIERS KOPA =====

    let filePath = req.url.split("?")[0];

    if (filePath === "/") {
        filePath = "/intex.html";
    }

    filePath = path.join(
        __dirname,
        "..",
        filePath
    );

    fs.readFile(filePath, function(error, data) {

        if (error) {

            res.setHeader(
                "Content-Type",
                "application/json; charset=utf-8"
            );

            res.writeHead(404);

            res.end(
                JSON.stringify({
                    success: false,
                    message: "Fichier introuvable."
                })
            );

            return;
        }

        const extension =
            path.extname(filePath).toLowerCase();

        const contentTypes = {

            ".html": "text/html; charset=utf-8",
            ".js": "application/javascript; charset=utf-8",
            ".css": "text/css; charset=utf-8",
            ".png": "image/png",
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".webp": "image/webp"
        };

        res.setHeader(
            "Content-Type",
            contentTypes[extension] ||
            "application/octet-stream"
        );

        res.writeHead(200);

        res.end(data);

    });

});


server.listen(3000, function() {

    console.log(
        "🔥 Serveur KOPA lancé sur http://localhost:3000"
    );

});