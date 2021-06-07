/*Création de la page du produit sélectionné*/

	async function infoProduit(){
    //Récupération de l'URL suivi du ?id=//
    produitID = location.search.substring(4);
    const produitSelect = await getProducts();
    console.log("Voici la page du produit id_"+produitSelect._id);

    //Affichage de la page du produit//
    let section = document.getElementById("section");
    section.style.display = "block";
    
    //Elements de la page du produit//
    document.getElementById("photoProduit").setAttribute("src", produitSelect.imageUrl);
    document.getElementById("nomProduit").innerHTML = produitSelect.name;
    document.getElementById("descProduit").innerHTML = produitSelect.description;
    document.getElementById("prixProduit").innerHTML = produitSelect.price / 100 + " euros";

    
    //Création des options selon le type de produit (ligne 3 de index.js)//
    switch(produitsVente){
		case "teddies":
    	produitSelect.colors.forEach((produit)=>{
    		let optionProduit = document.createElement("option");
    		document.getElementById("choixOption").appendChild(optionProduit).innerHTML = produit;
    	});
		break;
    	case "cameras":
    	produitSelect.lenses.forEach((produit)=>{
    		let optionProduit = document.createElement("option");
    		document.getElementById("choixOption").appendChild(optionProduit).innerHTML = produit;
    	});
    	break;
    	case "furniture":
    	produitSelect.varnish.forEach((produit)=>{
    		let optionProduit = document.createElement("option");
    		document.getElementById("choixOption").appendChild(optionProduit).innerHTML = produit;
    	});    	
    	break;
    	default:
    	console.log("Merci d'ajouter une variable produitsVente à la ligne 3 du fichier index.js");
    }
};

 /*Panier*/

	//Vérification et initialisation du panier//
	if (localStorage.getItem("panierUser")) {
	console.log("Panier de l'utilisateur présent dans le localStorage");
	} else {
	console.log("Panier inexistant. Création et envoi du panier dans le localStorage");

  	//Tableau de produits//
  	let initPanier = [];
  	localStorage.setItem("panierUser", JSON.stringify(initPanier));
  	};

  	//Tableau et objet requis par l'API//
  	let contact;
  	let products = [];

	//Création du panier de l'utilisateur// 
	let panierUser = JSON.parse(localStorage.getItem("panierUser"));

	ajoutPanier = () =>{
	//Lorsque l'utilisateur clique sur "Ajouter au panier"//
	let inputBuy = document.getElementById("ajoutProduit");
	inputBuy.addEventListener("click", async function() {
		const produits = await getProducts();
	//Récupération du panier dans le localStorage et ajout du produit dans le panier//
	panierUser.push(produits);
	localStorage.setItem("panierUser", JSON.stringify(panierUser));
	console.log("Le produit a été ajouté au panier");
	alert("Ce produit a été ajouté à votre panier")
	});
	};

	//Affichage du nombre de produits dans le panier//
	function nombrePanierAccueil() {
	let panierAccueil = document.getElementById("panierAccueil");
	panierAccueil.textContent = panierUser.length;
  }
  
  	function nombrePanierProduit() {
	let panierProduit = document.getElementById("panierProduit");
	panierProduit.textContent = panierUser.length;
  }
