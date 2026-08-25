let cart = JSON.parse(localStorage.getItem("kopaCart")) || []; 
function addToCart(productName, price, shop) { 
    const existingProduct = cart.find(function(product) { 
        return product.name === productName && product.shop === shop; 
    }); 
    if (existingProduct) { 
        existingProduct.quantity += 1; 
    } else { 
        cart.push({ 
            name: productName, 
            price: price,
            shop: shop, 
            quantity: 1 
        }); 
    } 
    localStorage.setItem("kopaCart", JSON.stringify(cart)); 
    alert(productName + " a été ajouté au panier !"); 
    displayCart(); 
} 
function changeQuantity(productName, change) { 
    const product = cart.find(function(item) { 
        return item.name === productName; 
    }); 
    if (product) { 
        product.quantity += change; 
        if (product.quantity < 1) { 
            product.quantity = 1; 
        } 
        localStorage.setItem("kopaCart", JSON.stringify(cart)); 
        displayCart(); 
    } 
}
function removeFromCart(productName) {

    cart = cart.filter(function(product) {

        return product.name !== productName;

    });

    localStorage.setItem("kopaCart", JSON.stringify(cart));

    displayCart();

}
function displayCart() { 
    const cartItems = document.getElementById("cart-items"); 
    const cartTotal = document.getElementById("cart-total"); 
    if (!cartItems || !cartTotal) { 
        return; 
    } 
    cartItems.innerHTML = ""; 
    let total = 0; 
    cart.forEach(function(product) { 
        // Si un ancien produit n'a pas de quantité 
        if (!product.quantity) { 
            product.quantity = 1; 
        } 
        const subtotal = product.price * product.quantity; 
        const productElement = document.createElement("div"); 
        productElement.innerHTML = `

    <h3>${product.name}</h3>

    <p>${product.price} $ × ${product.quantity}</p>

    <button onclick="changeQuantity('${product.name}', -1)">

        −

    </button>

    <button onclick="changeQuantity('${product.name}', 1)">

        +

    </button>
    <button onclick="removeFromCart('${product.name}')">
        🗑️
    </button>
    <p>Sous-total : ${subtotal} $</p>

`; 
        cartItems.appendChild(productElement); 
        total = total + subtotal; 
    }); 
    cartTotal.textContent = "Total : " + total + " $"; 
    localStorage.setItem("kopaCart", JSON.stringify(cart)); 
} 
displayCart();