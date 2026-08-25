const params = new URLSearchParams(window.location.search); 
const shop = params.get("shop"); 
const shopName = document.getElementById("shop-name"); 
const shopCategory = document.getElementById("shop-category"); 
if (shop === "sarah") { 
    shopName.textContent = "Sarah Fashion"; 
    shopCategory.textContent = "Mode et vêtements"; 
} else if (shop === "tech") { 
    shopName.textContent = "Tech Store"; 
    shopCategory.textContent = "Téléphones et accessoires"; 
} else if (shop === "beauty") { 
    shopName.textContent = "Beauty Shop"; 
    shopCategory.textContent = "Cosmétiques et beauté"; 
} 
console.log("BOUTIQUE :", shop);
const productsContainer = document.querySelector(".product-container");

const shopProducts = {

    sarah: [

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

    ],

    tech: [

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

    ],

    beauty: [

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

};
if (productsContainer && shopProducts[shop]) {

    productsContainer.innerHTML = "";

    shopProducts[shop].forEach(function(product) {

        productsContainer.innerHTML += `

            <div class="product-card">

                <div class="product-image">

                    ${product.image}

                </div>

                <h3>${product.name}</h3>

                <p>${product.price} $</p>

                <button onclick="addToCart('${product.name}', ${product.price}, '${shop}')">

                    Ajouter au panier

                </button>

            </div>

        `;

    });

}

