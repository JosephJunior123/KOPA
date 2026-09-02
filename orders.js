// ===== COMMANDES KOPA =====

const ordersContainer =
    document.getElementById("orders-container");

let savedOrders =
    JSON.parse(
        localStorage.getItem("kopaOrders")
    ) || [];
// ===== STATISTIQUES =====

function updateOrderStats() {

    const totalOrders =
        savedOrders.length;

    const newOrders =
        savedOrders.filter(function(order) {
            return !order.status ||
                   order.status === "Nouvelle";
        }).length;

    const preparingOrders =
        savedOrders.filter(function(order) {
            return order.status === "En préparation";
        }).length;

    const readyOrders =
        savedOrders.filter(function(order) {
            return order.status === "Prête";
        }).length;

    const deliveredOrders =
        savedOrders.filter(function(order) {
            return order.status === "Livrée";
        }).length;


    document.getElementById("total-orders")
        .textContent = totalOrders;

    document.getElementById("new-orders")
        .textContent = newOrders;

    document.getElementById("preparing-orders")
        .textContent = preparingOrders;

    document.getElementById("ready-orders")
        .textContent = readyOrders;

    document.getElementById("delivered-orders")
        .textContent = deliveredOrders;
}


// ===== STATUT DE LA COMMANDE =====

function getStatusInfo(status) {

    if (status === "En préparation") {

        return {
            text: "🔵 En préparation",
            className: "status-preparation"
        };

    }

    if (status === "Prête") {

        return {
            text: "🟢 Prête",
            className: "status-ready"
        };

    }

    if (status === "Livrée") {

        return {
            text: "✅ Livrée",
            className: "status-delivered"
        };

    }

    return {
        text: "🟡 Nouvelle commande",
        className: "status-new"
    };
}


// ===== CHANGER LE STATUT =====

function changeOrderStatus(orderIndex, newStatus) {

    if (!savedOrders[orderIndex]) {
        return;
    }

    savedOrders[orderIndex].status =
        newStatus;

    localStorage.setItem(
        "kopaOrders",
        JSON.stringify(savedOrders)
    );

    displayOrders();
    updateOrderStats();
}


// ===== AFFICHER LES COMMANDES =====

function displayOrders() {

    if (!ordersContainer) {
        return;
    }

    if (savedOrders.length === 0) {

        ordersContainer.innerHTML = `
            <div class="empty-orders">

                <div class="empty-orders-icon">
                    📦
                </div>

                <h2>
                    Aucune commande
                </h2>

                <p>
                    Vous n'avez pas encore reçu
                    de commande.
                </p>

            </div>
        `;

        return;
    }

    ordersContainer.innerHTML = "";

    savedOrders.forEach(function(order, index) {

        let total = 0;
        let productsHTML = "";

        order.cart.forEach(function(product) {

            const quantity =
                product.quantity || 1;

            const subtotal =
                Number(product.price) *
                quantity;

            total += subtotal;

            productsHTML += `
                <div class="order-product">

                    <div>

                        <strong>
                            ${product.name}
                        </strong>

                        <p>
                            ${quantity} ×
                            ${product.price} $
                        </p>

                    </div>

                    <strong>
                        ${subtotal} $
                    </strong>

                </div>
            `;
        });


        // ===== PAIEMENT =====

        let paymentName =
            "Non renseigné";

        if (
            order.paymentMethod ===
            "orange-money"
        ) {

            paymentName =
                "🟠 Orange Money";

        } else if (
            order.paymentMethod ===
            "airtel-money"
        ) {

            paymentName =
                "🔴 Airtel Money";

        } else if (
            order.paymentMethod ===
            "mpesa"
        ) {

            paymentName =
                "🟢 Vodacom M-Pesa";
        }


        // ===== DATE =====

        const orderDate =
            order.date
                ? new Date(order.date)
                    .toLocaleString("fr-FR")
                : "Date inconnue";


        // ===== STATUT =====

        const statusInfo =
            getStatusInfo(order.status);
        // ===== VOIR LES DÉTAILS =====

function toggleOrderDetails(orderIndex) {

    const details = document.getElementById(
        "order-details-" + orderIndex
    );

    const button = document.getElementById(
        "view-order-" + orderIndex
    );

    if (!details || !button) {
        return;
    }

    if (
        details.style.display === "none" ||
        details.style.display === ""
    ) {

        details.style.display = "block";

        button.textContent =
            "🙈 Masquer les détails";

    } else {

        details.style.display = "none";

        button.textContent =
            "👀 Voir les détails";
    }
}

        // ===== AFFICHAGE =====

        ordersContainer.innerHTML += `

            <div class="order-card">

                <div class="order-header">

                    <div>

                        <span
                            class="order-status
                            ${statusInfo.className}"
                        >
                            ${statusInfo.text}
                        </span>

                        <h2>
                            📦 ${order.id || "Commande KOPA"}
                        </h2>

                    </div>

                    <span>
                        ${orderDate}
                    </span>

                </div>


                <!-- CLIENT -->

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


                <!-- PRODUITS -->

                <div class="order-products">

                    <h3>
                        🛍 Produits commandés
                    </h3>

                    ${productsHTML}

                </div>


                <!-- PAIEMENT -->

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


                <!-- TOTAL -->

                <div class="order-total">

                    <span>
                        Total de la commande
                    </span>

                    <strong>
                        ${total} $
                    </strong>

                </div>
                <button
     type="button"
    class="view-order-btn"
    data-order-index="${index}"
>
    👀 Voir les détails
</button>

<div
    id="order-details-${index}"
    class="order-details"
    style="display: none;"
>
    <p>
    💳 Paiement :
    <strong>
        ${paymentName}
    </strong>
</p>

<p>
    📱 Mobile Money :
    <strong>
        ${order.paymentPhone || "Non renseigné"}
    </strong>
</p>
    <p>
        📋 Numéro :
        <strong>${order.id}</strong>
    </p>

    <p>
        📅 Date :
        <strong>${orderDate}</strong>
    </p>

    <p>
        📦 Statut :
        <strong>${statusInfo.text}</strong>
    </p>

    <p>
        👤 Client :
        <strong>${order.customerName}</strong>
    </p>

    <p>
        📱 Téléphone :
        <strong>${order.customerPhone}</strong>
    </p>

    <p>
        📍 Adresse :
        <strong>${order.customerAddress}</strong>
    </p>

</div>


                <!-- GESTION DU STATUT -->

                <div class="order-actions">

                    <label for="status-${index}">
                        📋 Statut de la commande
                    </label>

                    <select
                        id="status-${index}"
                        onchange="
                            changeOrderStatus(
                                ${index},
                                this.value
                            )
                        "
                    >

                        <option
                            value="Nouvelle"
                            ${
                                !order.status ||
                                order.status === "Nouvelle"
                                ? "selected"
                                : ""
                            }
                        >
                            🟡 Nouvelle commande
                        </option>

                        <option
                            value="En préparation"
                            ${
                                order.status ===
                                "En préparation"
                                ? "selected"
                                : ""
                            }
                        >
                            🔵 En préparation
                        </option>

                        <option
                            value="Prête"
                            ${
                                order.status ===
                                "Prête"
                                ? "selected"
                                : ""
                            }
                        >
                            🟢 Prête
                        </option>

                        <option
                            value="Livrée"
                            ${
                                order.status ===
                                "Livrée"
                                ? "selected"
                                : ""
                            }
                        >
                            ✅ Livrée
                        </option>

                    </select>
                    <button
    class="delete-order-btn"
    onclick="deleteOrder(${index})"
>
    🗑 Supprimer la commande
</button>

                </div>

            </div>

        `;
    });
}
// ===== SUPPRIMER UNE COMMANDE =====

function deleteOrder(orderIndex) {

    if (!savedOrders[orderIndex]) {
        return;
    }

    const confirmation = confirm(
        "Voulez-vous vraiment supprimer cette commande ?"
    );

    if (!confirmation) {
        return;
    }

    savedOrders.splice(orderIndex, 1);

    localStorage.setItem(
        "kopaOrders",
        JSON.stringify(savedOrders)
    );

    displayOrders();
    updateOrderStats();
}
// ===== AFFICHAGE INITIAL =====
updateOrderStats();
displayOrders();
// ===== BOUTONS VOIR LES DÉTAILS =====

document.addEventListener("click", function(event) {

    const button =
        event.target.closest(".view-order-btn");

    if (!button) {
        return;
    }

    const index =
        button.getAttribute("data-order-index");

    const details =
        document.getElementById(
            "order-details-" + index
        );

    if (!details) {
        return;
    }

    if (
        details.style.display === "none" ||
        details.style.display === ""
    ) {

        details.style.display = "block";

        button.textContent =
            "🙈 Masquer les détails";

    } else {

        details.style.display = "none";

        button.textContent =
            "👀 Voir les détails";
    }

});