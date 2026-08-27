// ===== INFORMATIONS DE LA BOUTIQUE =====

const savedShop = JSON.parse(

    localStorage.getItem("kopaShop")

);

const shopName = document.getElementById("my-shop-name");

const shopCategory = document.getElementById("my-shop-category");

const shopDescription = document.getElementById("my-shop-description");

if (savedShop) {

    shopName.textContent = savedShop.name;

    shopCategory.textContent = savedShop.category;

    shopDescription.textContent = savedShop.description;

}

// ===== FORMULAIRE PRODUIT =====

function showProductForm() {

    const formContainer =

        document.getElementById("product-form-container");

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

                💰 Prix

            </label>

            <input

                type="number"

                id="product-price"

                placeholder="Exemple : 25"

                min="0"

                required

            >

            <label for="product-category">

                🏷️ Catégorie

            </label>

            <input

                type="text"

                id="product-category"

                placeholder="Exemple : Vêtements"

                required

            >

            <label for="product-description">

                📝 Description

            </label>

            <textarea

                id="product-description"

                placeholder="Décrivez votre produit..."

                required

            ></textarea>

            <label for="product-stock">

                📦 Stock disponible

            </label>

            <input

                type="number"

                id="product-stock"

                placeholder="Exemple : 10"

                min="0"

                required

            >

            <label for="product-image">

                📸 Photo du produit

            </label>

            <input

                type="file"

                id="product-image"

                accept="image/*"

                required

            >

            <button type="submit">

                ➕ Ajouter le produit

            </button>

        </form>

    `;

    document

        .getElementById("product-form")

        .addEventListener("submit", addProduct);

}

// ===== AJOUTER UN PRODUIT =====

function addProduct(event) {

    event.preventDefault();

    const productName =

        document.getElementById("product-name").value.trim();

    const productPrice =

        Number(document.getElementById("product-price").value);

    const productCategory =

        document.getElementById("product-category").value.trim();

    const productDescription =

        document.getElementById("product-description").value.trim();

    const productStock =

        Number(document.getElementById("product-stock").value);

    const imageInput =

        document.getElementById("product-image");

    const imageFile =

        imageInput.files[0];

    // ===== VALIDATION =====

    if (!productName || productPrice <= 0) {

        alert("Veuillez entrer un nom et un prix valide.");

        return;

    }

    if (!productCategory) {

        alert("Veuillez entrer une catégorie.");

        return;

    }

    if (!productDescription) {

        alert("Veuillez entrer une description.");

        return;

    }

    if (productStock < 0 || isNaN(productStock)) {

        alert("Veuillez entrer un stock valide.");

        return;

    }

    if (!imageFile) {

        alert("Veuillez sélectionner une photo.");

        return;

    }

    if (!savedShop) {

        alert("Aucune boutique n'a été trouvée.");

        return;

    }

    // ===== LECTURE DE LA PHOTO =====

    const reader = new FileReader();

    reader.onload = function() {

        const product = {

            name: productName,

            price: productPrice,

            category: productCategory,

            description: productDescription,

            stock: productStock,

            shop: savedShop.name,

            image: reader.result

        };

        let products =

            JSON.parse(

                localStorage.getItem("kopaProducts")

            ) || [];

        products.push(product);

        localStorage.setItem(

            "kopaProducts",

            JSON.stringify(products)

        );

        alert(

            productName +

            " a été ajouté à " +

            savedShop.name +

            " avec succès !"

        );

        document.getElementById(

            "product-form-container"

        ).innerHTML = "";

        displayProducts();

    };

    reader.readAsDataURL(imageFile);

}

// ===== AFFICHER LES PRODUITS =====

function displayProducts() {

    const productsContainer =

        document.getElementById(

            "my-products-container"

        );

    if (!productsContainer) {

        return;

    }

    const products =

        JSON.parse(

            localStorage.getItem("kopaProducts")

        ) || [];

    productsContainer.innerHTML = "";

    const myProducts =

        products.filter(function(product) {

            return product.shop === savedShop?.name;

        });

    if (myProducts.length === 0) {

        productsContainer.innerHTML = `

            <p class="empty-products">

                Aucun produit dans votre boutique pour le moment.

            </p>

        `;

        return;

    }

    myProducts.forEach(function(product) {

        productsContainer.innerHTML += `

            <div class="product-card">

                <div class="product-image">

                    <img

                        src="${product.image}"

                        alt="${product.name}"

                    >

                </div>

                <h3>

    ${product.name}

</h3>

<p class="product-price">

    💰 ${product.price} $

</p>

<p class="product-category">

    🏷️ ${product.category}

</p>

<p class="product-description">

    ${product.description}

</p>

<p class="product-stock">

    📦 Stock : ${product.stock}

</p>
                <button

                    onclick="addToCart('${product.name}', ${product.price})"

                >

                    🛒 Ajouter au panier

                </button>

                <button

                    onclick="editProduct('${product.name}')"

                >

                    ✏️ Modifier

                </button>

                <button

                    onclick="deleteProduct('${product.name}')"

                >

                    🗑️ Supprimer

                </button>

            </div>

        `;

    });

}

// ===== MODIFIER UN PRODUIT =====

function editProduct(productName) {

    const products =

        JSON.parse(

            localStorage.getItem("kopaProducts")

        ) || [];

    const product =

        products.find(function(item) {

            return (

                item.name === productName &&

                item.shop === savedShop?.name

            );

        });

    if (!product) {

        alert("Produit introuvable.");

        return;

    }

    const newName =

        prompt(

            "Nouveau nom du produit :",

            product.name

        );

    if (newName === null) {

        return;

    }

    const newPrice =

        prompt(

            "Nouveau prix :",

            product.price

        );

    if (newPrice === null) {

        return;

    }

    const newCategory =

        prompt(

            "Nouvelle catégorie :",

            product.category || ""

        );

    if (newCategory === null) {

        return;

    }

    const newDescription =

        prompt(

            "Nouvelle description :",

            product.description || ""

        );

    if (newDescription === null) {

        return;

    }

    const newStock =

        prompt(

            "Nouveau stock :",

            product.stock ?? 0

        );

    if (newStock === null) {

        return;

    }

    const priceNumber =

        Number(newPrice);

    const stockNumber =

        Number(newStock);

    if (

        !newName.trim() ||

        priceNumber <= 0 ||

        !newCategory.trim() ||

        !newDescription.trim() ||

        stockNumber < 0 ||

        isNaN(stockNumber)

    ) {

        alert(

            "Veuillez entrer des informations valides."

        );

        return;

    }

    product.name =

        newName.trim();

    product.price =

        priceNumber;

    product.category =

        newCategory.trim();

    product.description =

        newDescription.trim();

    product.stock =

        stockNumber;

    localStorage.setItem(

        "kopaProducts",

        JSON.stringify(products)

    );

    displayProducts();

    alert(

        "Le produit a été modifié avec succès !"

    );

}

// ===== AFFICHAGE INITIAL =====


// ===== SUPPRIMER UN PRODUIT =====

function deleteProduct(productName) {

    const products =

        JSON.parse(

            localStorage.getItem("kopaProducts")

        ) || [];

    const product =

        products.find(function(item) {

            return (

                item.name === productName &&

                item.shop === savedShop?.name

            );

        });

    if (!product) {

        alert("Produit introuvable.");

        return;

    }

    const confirmation =

        confirm(

            "Voulez-vous vraiment supprimer " +

            product.name +

            " ?"

        );

    if (!confirmation) {

        return;

    }

    const updatedProducts =

        products.filter(function(item) {

            return !(

                item.name === productName &&

                item.shop === savedShop?.name

            );

        });

    localStorage.setItem(

        "kopaProducts",

        JSON.stringify(updatedProducts)

    );

    displayProducts();

    alert(

        productName +

        " a été supprimé de votre boutique."

    );

}
displayProducts();