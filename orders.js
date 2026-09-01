// ===== COMMANDES KOPA =====

const ordersContainer =
    document.getElementById("orders-container");

const savedOrders =
    JSON.parse(
        localStorage.getItem("kopaOrders")
    ) || [];

if (!ordersContainer) {

    // Rien à faire

} else if (savedOrders.length === 0) {

    ordersContainer.innerHTML = `
        <div class="empty-orders">

            <div class="empty-orders-icon">
                📦
            </div>

            <h2>
                Aucune commande
            </h2>

            <p>
                Vous n'avez pas encore reçu de commande.
            </p>

        </div>
    `;

} else {

    ordersContainer.innerHTML = "";

    savedOrders.forEach(function(order, index) {

        let total = 0;
        let productsHTML = "";

        order.cart.forEach(function(product) {

            const quantity =
                product.quantity || 1;

            const subtotal =
                Number(product.price) * quantity;

            total += subtotal;

            productsHTML += `
                <div class="order-product">

                    <div>

                        <strong>
                            ${product.name}
                        </strong>

                        <p>
                            ${quantity} × ${product.price} $
                        </p>

                    </div>

                    <strong>
                        ${subtotal} $
                    </strong>

                </div>
            `;
        });

        let paymentName =
            "Non renseigné";

        if (order.paymentMethod === "orange-money") {

            paymentName =
                "🟠 Orange Money";

        } else if (
            order.paymentMethod === "airtel-money"
        ) {

            paymentName =
                "🔴 Airtel Money";

        } else if (
            order.paymentMethod === "mpesa"
        ) {

            paymentName =
                "🟢 Vodacom M-Pesa";
        }

        const orderDate =
            order.date
                ? new Date(order.date)
                    .toLocaleString("fr-FR")
                : "Date inconnue";

        ordersContainer.innerHTML += `

            <div class="order-card">

                <div class="order-header">

                    <div>

                        <span class="order-status">
                            🟡 Nouvelle commande
                        </span>

                        <h2>
                            📦 Commande #${index + 1}
                        </h2>

                    </div>

                    <span>
                        ${orderDate}
                    </span>

                </div>

                <div class="order-customer">

                    <h3>
                        👤 Informations du client
                    </h3>

                    <p>
                        <strong>Nom :</strong>
                        ${order.customerName}
                    </p>

                    <p>
                        <strong>Téléphone :</strong>
                        ${order.customerPhone}
                    </p>

                    <p>
                        <strong>Adresse :</strong>
                        ${order.customerAddress}
                    </p>

                    ${
                        order.deliveryNote
                        ? `
                            <p>
                                <strong>Note :</strong>
                                ${order.deliveryNote}
                            </p>
                        `
                        : ""
                    }

                </div>

                <div class="order-products">

                    <h3>
                        🛍 Produits commandés
                    </h3>

                    ${productsHTML}

                </div>

                <div class="order-payment">

                    <p>
                        💳 Paiement :
                        <strong>
                            ${paymentName}
                        </strong>
                    </p>

                    <p>
                        📱 Numéro Mobile Money :
                        <strong>
                            ${
                                order.paymentPhone ||
                                "Non renseigné"
                            }
                        </strong>
                    </p>

                </div>

                <div class="order-total">

                    <span>
                        Total de la commande
                    </span>

                    <strong>
                        ${total} $
                    </strong>

                </div>

            </div>
        `;
    });
}