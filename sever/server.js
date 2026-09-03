// ===== SERVEUR KOPA =====

const http = require("http");

const server = http.createServer(function(req, res) {

    // Autoriser notre page KOPA à communiquer avec le serveur
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    if (req.method === "GET" && req.url === "/") {

        res.writeHead(200);

        res.end(
            JSON.stringify({
                success: true,
                message: "🔥 Serveur KOPA opérationnel !"
            })
        );

        return;
    }

    if (
        req.method === "POST" &&
        req.url === "/payment-test"
    ) {

        res.writeHead(200);

        res.end(
            JSON.stringify({
                success: true,
                message: "✅ Demande de paiement reçue par KOPA."
            })
        );

        return;
    }

    res.writeHead(404);

    res.end(
        JSON.stringify({
            success: false,
            message: "Route introuvable."
        })
    );

});

server.listen(3000, function() {

    console.log(
        "🔥 Serveur KOPA lancé sur http://localhost:3000"
    );

});