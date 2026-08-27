// ===== OUVRIR UNE BOUTIQUE =====

function openShop(shop) {

    window.location.href =

        "shop.html?shop=" + shop;

}

// ===== AFFICHER LES BOUTIQUES =====

const shops =

    JSON.parse(

        localStorage.getItem("kopaShops")

    ) || [];

const myShopContainer =

    document.getElementById(

        "my-shop-container"

    );

if (

    myShopContainer &&

    shops.length > 0

) {

    myShopContainer.innerHTML = "";

    shops.forEach(function(shop) {

        myShopContainer.innerHTML += `

            <div class="shop-card">

                <div class="shop-image">

                    🏪

                </div>

                <h3>

                    ${shop.name}

                </h3>

                <p>

                    ${shop.category}

                </p>

                <p>

                    ${shop.description}

                </p>

                <button

                    onclick="

                        window.location.href =

                        'my-shop.html?shop=${shop.id}'

                    "

                >

                    🏪 Ma boutique

                </button>

            </div>

        `;

    });

}