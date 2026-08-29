// ===== CONFIRMATION KOPA =====

const orderSummary =

    document.getElementById("order-summary");

const savedOrder =

    JSON.parse(

        localStorage.getItem("kopaOrder")

    );

if (!savedOrder) {

    orderSummary.innerHTML = `

        <p>

            Aucune commande trouvée.

        </p>

    `;

} else {

    let total = 0;

    let productsHTML = "";

    savedOrder.cart.forEach(function(product) {

        const quantity =

            product.quantity || 1;

        const subtotal =

            Number(product.price) * quantity;

        total += subtotal;

        productsHTML += `

            <div class="summary-product">

                <span>

                    ${product.name}

                    × ${quantity}

                </span>

                <strong>

                    ${subtotal} $

                </strong>

            </div>

        `;

    });

    orderSummary.innerHTML = `

        <h2>

            Résumé de la commande

        </h2>

        ${productsHTML}

        <div class="summary-total">

            <span>

                Total

            </span>

            <strong>

                ${total} $

            </strong>

        </div>

        <hr>

        <p>

            👤 ${savedOrder.customerName}

        </p>

        <p>

            📱 ${savedOrder.customerPhone}

        </p>

        <p>

            📍 ${savedOrder.customerAddress}

        </p>

    `;

}