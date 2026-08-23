function openShop(shop) {
    window.location.href = "shop.html?shop=" + shop;
}
const savedShop = JSON.parse(localStorage.getItem("kopaShop"));

const myShopContainer = document.getElementById("my-shop-container");

if (savedShop && myShopContainer) {

    myShopContainer.innerHTML = `

    

        <div class="shop-card">

            <div class="shop-image">

                🏪

            </div>

            <h3>${savedShop.name}</h3>

            <p>${savedShop.category}</p>

            <p>${savedShop.description}</p>

            <button onclick="window.location.href='my-shop.html'">
                Ma boutique
            </button>

        </div>

    `;

}