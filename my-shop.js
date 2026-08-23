const savedShop = JSON.parse(localStorage.getItem("kopaShop"));

const shopName = document.getElementById("my-shop-name");

const shopCategory = document.getElementById("my-shop-category");

const shopDescription = document.getElementById("my-shop-description");

if (savedShop) {

    shopName.textContent = savedShop.name;

    shopCategory.textContent = savedShop.category;

    shopDescription.textContent = savedShop.description;

}
function showProductForm() {

    const formContainer = document.getElementById("product-form-container");

    formContainer.innerHTML = `

    

        <form id="product-form">

            <label for="product-name">

                Nom du produit

            </label>

            <input

                type="text"

                id="product-name"

                placeholder="Exemple : T-shirt"

                required

            >

            <label for="product-price">

                Prix

            </label>

            <input

                type="number"

                id="product-price"

                placeholder="Exemple : 25"

                required

            >

            <button type="submit">

                Ajouter le produit

            </button>

        </form>
    `;

    document

        .getElementById("product-form")

        .addEventListener("submit", addProduct);

}
function addProduct(event) {

    event.preventDefault();

    const productName = document.getElementById("product-name").value;

    const productPrice = document.getElementById("product-price").value;

    const product = {

    name: productName,

    price: Number(productPrice)

};

let products = JSON.parse(localStorage.getItem("kopaProducts")) || [];

products.push(product);

localStorage.setItem("kopaProducts", JSON.stringify(products));

console.log("Nouveau produit :", product);

alert(productName + " a été ajouté avec succès !");
}
function displayProducts() {

    const productsContainer =

        document.getElementById("my-products-container");

    const products =

        JSON.parse(localStorage.getItem("kopaProducts")) || [];

    if (!productsContainer) {

        return;

    }

    productsContainer.innerHTML = "";

    products.forEach(function(product) {

        productsContainer.innerHTML += `

            <div class="product-card">

                <div class="product-image">

                    🛍️

                </div>

                <h3>${product.name}</h3>

                <p>${product.price} $</p>

                <button onclick="addToCart('${product.name}', ${product.price})">
                    Ajouter au panier
                </button>
                <button onclick="editProduct('${product.name}')">
                    ✏️ Modifier
                </button>

            </div>

        `;

    });

}

displayProducts();
function editProduct(productName) {

    const products =

        JSON.parse(localStorage.getItem("kopaProducts")) || [];

    const product = products.find(function(item) {

        return item.name === productName;

    });

    if (!product) {

        return;

    }

    const newName = prompt(

        "Nouveau nom du produit :",

        product.name

    );

    if (newName === null) {

        return;

    }

    const newPrice = prompt(

        "Nouveau prix :",

        product.price

    );

    if (newPrice === null) {

        return;

    }

    product.name = newName;

    product.price = Number(newPrice);

    localStorage.setItem(

        "kopaProducts",

        JSON.stringify(products)

    );

    displayProducts();

}