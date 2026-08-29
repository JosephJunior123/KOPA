// ===== PAIEMENT KOPA =====

const paymentForm =

    document.getElementById("payment-form");

paymentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const selectedPayment =

        document.querySelector(

            'input[name="payment-method"]:checked'

        );

    if (!selectedPayment) {

        alert("Veuillez choisir un moyen de paiement.");

        return;

    }

    const order =

        JSON.parse(

            localStorage.getItem("kopaOrder")

        );

    if (!order) {

        alert("Aucune commande trouvée.");

        return;

    }

    // Enregistrer le moyen de paiement

    order.paymentMethod =

        selectedPayment.value;

    localStorage.setItem(

        "kopaOrder",

        JSON.stringify(order)

    );

    // Aller à la confirmation

    window.location.href =

        "confirmation.html";

});