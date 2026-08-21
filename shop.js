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