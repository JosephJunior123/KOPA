// ===== VALIDATION DE LA COMMANDE KOPA =====

const checkoutForm =

    document.getElementById("checkout-form");

if (checkoutForm) {

    checkoutForm.addEventListener(

        "submit",

        function(event) {

            event.preventDefault();

            const customerName =

                document

                    .getElementById("customer-name")

                    .value

                    .trim();

            const customerPhone =

                document

                    .getElementById("customer-phone")

                    .value

                    .trim();

            const customerAddress =

                document

                    .getElementById("customer-address")

                    .value

                    .trim();

            const deliveryNote =

                document

                    .getElementById("delivery-note")

                    .value

                    .trim();

            // ===== VALIDATION =====

            if (

                !customerName ||

                !customerPhone ||

                !customerAddress

            ) {

                alert(

                    "Veuillez remplir tous les champs obligatoires."

                );

                return;

            }

            // ===== RÉCUPÉRER LE PANIER =====

            const cart =

                JSON.parse(

                    localStorage.getItem("kopaCart")

                ) || [];

            if (cart.length === 0) {

                alert(

                    "Votre panier est vide."

                );

                return;

            }

            // ===== CRÉER LA COMMANDE =====

            const order = {

                id:

                    "KOPA-" +

                    Date.now(),

                customerName:

                    customerName,

                customerPhone:

                    "+243 " +

                    customerPhone,

                customerAddress:

                    customerAddress,

                deliveryNote:

                    deliveryNote,

                cart:

                    cart,

                date:

                    new Date().toISOString(),

                status:

                    "Nouvelle"

            };

            // ===== RÉCUPÉRER LES ANCIENNES COMMANDES =====

            let orders =

                JSON.parse(

                    localStorage.getItem("kopaOrders")

                ) || [];

            // ===== AJOUTER LA NOUVELLE COMMANDE =====

            orders.push(order);

            // ===== SAUVEGARDER =====

            localStorage.setItem(

                "kopaOrders",

                JSON.stringify(orders)

            );

            // ===== GARDER AUSSI LA DERNIÈRE COMMANDE =====

            localStorage.setItem(

                "kopaOrder",

                JSON.stringify(order)

            );

            // ===== ALLER AU PAIEMENT =====

            window.location.href =

                "payment.html";

        }

    );

}