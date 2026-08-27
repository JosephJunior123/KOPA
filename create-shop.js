const shopForm = document.getElementById("shop-form");

shopForm.addEventListener("submit", function(event) {

    event.preventDefault();

    // ===== INFORMATIONS DE LA BOUTIQUE =====

    const shopName =

        document.getElementById("shop-name").value.trim();

    const shopCategory =

        document.getElementById("shop-category").value.trim();

    const shopDescription =

        document.getElementById("shop-description").value.trim();

    const ownerName =

        document.getElementById("owner-name").value.trim();

    const shopAddress =

        document.getElementById("shop-address").value.trim();

    const ownerPhone =

        document.getElementById("owner-phone").value.trim();

    const ownerPhotoInput =

        document.getElementById("owner-photo");

    const ownerPhotoFile =

        ownerPhotoInput.files[0];

    // ===== VALIDATION =====

    if (

        !shopName ||

        !shopCategory ||

        !shopDescription ||

        !ownerName ||

        !ownerPhone

    ) {

        alert(

            "Veuillez remplir tous les champs obligatoires."

        );

        return;

    }

    // ===== FONCTION DE SAUVEGARDE =====

    function saveShop(ownerPhoto) {

        const shop = {

            id: Date.now(),

            name: shopName,

            category: shopCategory,

            description: shopDescription,

            owner: ownerName,

            address: shopAddress,

            phone: ownerPhone,

            ownerPhoto: ownerPhoto

        };

        // Récupérer les boutiques existantes

        let shops =

            JSON.parse(

                localStorage.getItem("kopaShops")

            ) || [];

        // Ajouter la nouvelle boutique

        shops.push(shop);

        // Sauvegarder toutes les boutiques

        localStorage.setItem(

            "kopaShops",

            JSON.stringify(shops)

        );

        // Garder cette boutique comme boutique actuelle

        localStorage.setItem(

            "currentShopId",

            shop.id

        );

        alert(

            "Votre boutique " +

            shopName +

            " a été créée avec succès !"

        );

        console.log(

            "Nouvelle boutique :",

            shop

        );

        // Retour vers l'accueil

        window.location.href = "intex.html";

    }

    // ===== PHOTO DU VENDEUR =====

    if (ownerPhotoFile) {

        const reader =

            new FileReader();

        reader.onload = function() {

            saveShop(

                reader.result

            );

        };

        reader.readAsDataURL(

            ownerPhotoFile

        );

    } else {

        saveShop("");

    }

});