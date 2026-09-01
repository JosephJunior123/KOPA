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