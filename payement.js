// ===== RÉSUMÉ DE LA COMMANDE =====

const savedOrder = JSON.parse(
    localStorage.getItem("kopaOrder")
);

const paymentItems = document.getElementById(
    "payment-order-items"
);

const paymentTotal = document.getElementById(
    "payment-total"
);

if (savedOrder && savedOrder.cart) {

    let total = 0;

    savedOrder.cart.forEach(function(product) {

        const quantity = product.quantity || 1;

        const subtotal =
            Number(product.price) * quantity;

        total += subtotal;

        paymentItems.innerHTML += `
            <div class="payment-product">
                <span>
                    ${product.name} × ${quantity}
                </span>

                <strong>
                    ${subtotal} $
                </strong>
            </div>
        `;

    });

    paymentTotal.textContent =
        total + " $";
}


// ===== PAIEMENT KOPA =====

const paymentForm =
    document.getElementById("payment-form");

const phoneField =
    document.getElementById("phone-field");

const paymentPhone =
    document.getElementById("payment-phone");

const paymentPhoneLabel =
    document.getElementById("payment-phone-label");

const paymentMethods =
    document.querySelectorAll(
        'input[name="payment-method"]'
    );


// ===== CHOIX DU MOYEN DE PAIEMENT =====

paymentMethods.forEach(function(method) {

    method.addEventListener("change", function() {

        phoneField.style.display = "block";

        paymentPhone.required = true;

        if (this.value === "orange-money") {

            paymentPhoneLabel.textContent =
                "📱 Numéro Orange Money";

        } else if (this.value === "airtel-money") {

            paymentPhoneLabel.textContent =
                "📱 Numéro Airtel Money";

        } else if (this.value === "mpesa") {

            paymentPhoneLabel.textContent =
                "📱 Numéro M-Pesa";

        }

    });

});


// ===== VALIDATION DU PAIEMENT =====

paymentForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const selectedPayment =
            document.querySelector(
                'input[name="payment-method"]:checked'
            );

        if (!selectedPayment) {

            alert(
                "Veuillez choisir un moyen de paiement."
            );

            return;
        }

        if (!paymentPhone.value.trim()) {

            alert(
                "Veuillez entrer votre numéro Mobile Money."
            );

            paymentPhone.focus();

            return;
        }

        const order =
            JSON.parse(
                localStorage.getItem("kopaOrder")
            );

        if (!order) {

            alert(
                "Aucune commande trouvée."
            );

            return;
        }


        // ===== ENREGISTRER LES INFORMATIONS DE PAIEMENT =====

        order.paymentMethod =
            selectedPayment.value;

        order.paymentPhone =
            "+243 " +
            paymentPhone.value.trim();

        order.paymentStatus =
            "En attente";


        // Garder la commande actuelle à jour

        localStorage.setItem(
            "kopaOrder",
            JSON.stringify(order)
        );


        // ===== TEST SERVEUR KOPA =====

        fetch(
    "http://localhost:3000/payment-test",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            paymentMethod: order.paymentMethod,
            paymentPhone: order.paymentPhone,
            amount: order.cart.reduce(
                function(total, product) {
                    return total +
                        Number(product.price) *
                        (product.quantity || 1);
                },
                0
            )
        })
    }
)
.then(function(response) {

    if (!response.ok) {

        throw new Error(
            "Réponse serveur : " +
            response.status
        );

    }

    return response.json();

})
.then(function(data) {

    console.log(data.message);

    window.location.href =
        "confirmation.html";

})
.catch(function(error) {

    console.error(
        "Erreur de communication avec le serveur KOPA :",
        error
    );

    alert(
        "Impossible de contacter le serveur KOPA."
    );

});