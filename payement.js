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
    if (!paymentPhone.value.trim()) {

    alert("Veuillez entrer votre numéro Mobile Money.");

    paymentPhone.focus();

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
    order.paymentPhone =
    "+243 " + paymentPhone.value.trim();

   // ===== ENREGISTRER LA COMMANDE =====

let orders =
    JSON.parse(
        localStorage.getItem("kopaOrders")
    ) || [];

orders.push(order);

localStorage.setItem(
    "kopaOrders",
    JSON.stringify(orders)
);

// Garder également la commande actuelle
localStorage.setItem(
    "kopaOrder",
    JSON.stringify(order)
);

window.location.href =
    "confirmation.html";

});