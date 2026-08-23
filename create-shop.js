const shopForm = document.getElementById("shop-form");

shopForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const shopName = document.getElementById("shop-name").value;

    const shopCategory = document.getElementById("shop-category").value;

    const shopDescription = document.getElementById("shop-description").value;

    const ownerName = document.getElementById("owner-name").value;

    console.log("Nom de la boutique :", shopName);

    console.log("Catégorie :", shopCategory);

    console.log("Description :", shopDescription);

    console.log("Commerçant :", ownerName);
    const shop = {

    name: shopName,

    category: shopCategory,

    description: shopDescription,

    owner: ownerName

};

localStorage.setItem("kopaShop", JSON.stringify(shop));
    alert("Votre boutique " + shopName + " a été créée avec succès !");

});