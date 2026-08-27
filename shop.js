// ===== BOUTIQUE ACTUELLE =====

const params =

    new URLSearchParams(

        window.location.search

    );

const shop =

    params.get("shop");

// ===== ÉLÉMENTS DE LA PAGE =====

const shopName =

    document.getElementById("shop-name");

const shopCategory =

    document.getElementById("shop-category");

const productsContainer =

    document.querySelector(

        ".product-container"

    );

// ===== BOUTIQUES PRÉDÉFINIES =====

const shopProducts = {

    sarah: {

        name: "Sarah Fashion",

        category: "Mode et vêtements",

        products: [

            {

                name: "Robe élégante",

                price: 25,

                image: "👗"

            },

            {

                name: "T-shirt tendance",

                price: 40,

                image: "👕"

            },

            {

                name: "Jean confortable",

                price: 60,

                image: "👖"

            }

        ]

    },

    tech: {

        name: "Tech Store",

        category: "Téléphones et accessoires",

        products: [

            {

                name: "Smartphone",

                price: 500,

                image: "📱"

            },

            {

                name: "Écouteurs Bluetooth",

                price: 50,

                image: "🎧"

            },

            {

                name: "Chargeur rapide",

                price: 30,

                image: "🔌"

            }

        ]

    },

    beauty: {

        name: "Beauty Shop",

        category: "Cosmétiques et beauté",

        products: [

            {

                name: "Crème visage",

                price: 20,

                image: "🧴"

            },

            {

                name: "Parfum",

                price: 45,

                image: "🌸"

            },

            {

                name: "Rouge à lèvres",

                price: 15,

                image: "💄"

            }

        ]

    }

};

// ===== AFFICHER UNE BOUTIQUE PRÉDÉFINIE =====

if (shopProducts[shop]) {

    shopName.textContent =

        shopProducts[shop].name;

    shopCategory.textContent =

        shopProducts[shop].category;

}

// ===== AFFICHER UNE BOUTIQUE CRÉÉE =====

const shops =

    JSON.parse(

        localStorage.getItem("kopaShops")

    ) || [];

const createdShop =

    shops.find(function(item) {

        return String(item.id) ===

               String(shop);

    });

if (createdShop) {

    shopName.textContent =

        createdShop.name;

    shopCategory.textContent =

        createdShop.category;

}

// ===== RÉCUPÉRER LES PRODUITS =====

let products = [];

// Produits prédéfinis

if (shopProducts[shop]) {

    products =

        shopProducts[shop].products;

}

// Produits créés par les commerçants

const savedProducts =

    JSON.parse(

        localStorage.getItem("kopaProducts")

    ) || [];

// Si c'est une boutique créée

if (createdShop) {

    products =

        savedProducts.filter(

            function(product) {

                return product.shop ===

                       createdShop.name;

            }

        );

}

// ===== AFFICHAGE DES PRODUITS =====

if (

    productsContainer &&

    products.length > 0

) {

    productsContainer.innerHTML = "";

    products.forEach(function(product) {

        productsContainer.innerHTML += `

            <div class="product-card">

                <div class="product-image">

                    ${

                        product.image &&

                        product.image.startsWith("data:")

                            ?

                            `<img

                                src="${product.image}"

                                alt="${product.name}"

                            >`

                            :

                            product.image

                    }

                </div>

                <h3>

                    ${product.name}

                </h3>

                <p>

                    💰 ${product.price} $
                </p>

                ${

                    product.category

                    ?

                    `<p>

                        🏷 ${product.category}

                    </p>`

                    :

                    ""

                }

                ${

                    product.description

                    ?

                    `<p>

                        ${product.description}

                    </p>`

                    :

                    ""

                }

                ${

                    product.stock !== undefined

                    ?

                    `<p>

                        📦 Stock : ${product.stock}

                    </p>`

                    :

                    ""

                }

                <button

                    onclick="

                        addToCart(

                            '${product.name}',

                            ${product.price},

                            '${shop}'

                        )

                    "

                >

                    🛒 Ajouter au panier

                </button>

            </div>

        `;

    });

} else if (productsContainer) {

    productsContainer.innerHTML = `

        <p class="empty-products">

            Aucun produit disponible

            dans cette boutique pour le moment.

        </p>

    `;

}

console.log(

    "BOUTIQUE :",

    shop

);

console.log(

    "PRODUITS :",

    products

);