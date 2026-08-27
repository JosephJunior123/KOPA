// ===== PANIER KOPA =====

let cart =

    JSON.parse(localStorage.getItem("kopaCart")) || [];

// ===== AJOUTER AU PANIER =====

function addToCart(productName, price, shop) {

    const existingProduct = cart.find(function(product) {

        return (

            product.name === productName &&

            product.shop === shop

        );

    });

    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({

            name: productName,

            price: Number(price),

            shop: shop,

            quantity: 1

        });

    }

    localStorage.setItem(

        "kopaCart",

        JSON.stringify(cart)

    );

    alert(productName + " a été ajouté au panier !");

    displayCart();

}

// ===== AFFICHER LE PANIER =====

function displayCart() {

    const cartItems =

        document.getElementById("cart-items");

    const cartTotal =

        document.getElementById("cart-total");

    if (!cartItems || !cartTotal) {

        return;

    }

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML =

            "<p>Votre panier est vide.</p>";

        cartTotal.textContent =

            "Total : 0 $";

        return;

    }

    cart.forEach(function(product, index) {

        if (!product.quantity) {

            product.quantity = 1;

        }

        const subtotal =

            Number(product.price) *

            Number(product.quantity);

        total += subtotal;

        const productElement =

            document.createElement("div");

        productElement.className =

            "cart-item";

        productElement.innerHTML = `

            <h3>${product.name}</h3>

            <p>🏪 ${product.shop || "Boutique"}</p>

            <p>💰 ${product.price} $</p>

            <div class="quantity-controls">

                <button

                    class="quantity-minus"

                    data-index="${index}"

                >

                    −

                </button>

                <strong>

                    ${product.quantity}

                </strong>

                <button

                    class="quantity-plus"

                    data-index="${index}"

                >

                    +

                </button>

            </div>

            <p>

                Sous-total :

                <strong>${subtotal} $</strong>

            </p>

            <button

                class="remove-product"

                data-index="${index}"

            >

                🗑 Supprimer

            </button>

            <hr>

        `;

        cartItems.appendChild(productElement);

    });

    cartTotal.textContent =

        "Total : " + total + " $";

    localStorage.setItem(

        "kopaCart",

        JSON.stringify(cart)

    );

}

// ===== GESTION DES BOUTONS =====

document.addEventListener("click", function(event) {

    const button = event.target.closest("button");

    if (!button) {

        return;

    }

    // ===== BOUTON PLUS =====

    if (button.classList.contains("quantity-plus")) {

        const index =

            Number(button.dataset.index);

        if (cart[index]) {

            cart[index].quantity += 1;

            localStorage.setItem(

                "kopaCart",

                JSON.stringify(cart)

            );

            displayCart();

        }

    }

    // ===== BOUTON MOINS =====

    if (button.classList.contains("quantity-minus")) {

        const index =

            Number(button.dataset.index);

        if (cart[index]) {

            cart[index].quantity -= 1;

            if (cart[index].quantity < 1) {

                cart[index].quantity = 1;

            }

            localStorage.setItem(

                "kopaCart",

                JSON.stringify(cart)

            );

            displayCart();

        }

    }

    // ===== SUPPRIMER =====

    if (button.classList.contains("remove-product")) {

        const index =

            Number(button.dataset.index);
    if (cart[index]) {

            const confirmation =

                confirm(

                    "Voulez-vous vraiment supprimer " +

                    cart[index].name +

                    " du panier ?"

                );

            if (!confirmation) {

                return;

            }

            cart.splice(index, 1);

            localStorage.setItem(

                "kopaCart",

                JSON.stringify(cart)

            );

            displayCart();

        }

    }

});

// ===== AFFICHAGE INITIAL =====

displayCart();