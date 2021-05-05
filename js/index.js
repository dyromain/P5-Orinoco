/*Génération de l'URL de l'API*/

const produitsVente = "teddies"
const APIURL = "http://localhost:3000/api/" + produitsVente + "/";

//id du produit pour pouvoir effectuer un tri dans l'API//

let idProduit = "";

/*Préparation des requis pour le script*/

/*Il doit y avoir un panier dans le localStorage du navigateur de l'utilisateur.
S'il n'y a pas de panier dans le localStorage, il faut le créer et l'envoyer dans le localStorage*/

if(localStorage.getItem("panierUser")){
	console.log("Panier de l'utilisateur présent dans le localStorage");
}else{
	console.log("Panier absent. Création et envoi du panier dans le localStorage");
  	//Tableau de produits//
  	let panierInit = [];
  	localStorage.setItem("panierUser", JSON.stringify(panierInit));
  };

  	//Tableau et objet requis par l'API//
  	let contact;
  	let products = [];

	//Le panier est désormais créé pour l'utilisateur//
	let userPanier = JSON.parse(localStorage.getItem("panierUser"));


/*Appel de l'API*/

getProduits = () =>{
	return new Promise((resolve) =>{
		let request = new XMLHttpRequest();
		request.onreadystatechange = function() {
			if (this.readyState == XMLHttpRequest.DONE && 
				this.status == 200) 
			{
				resolve(JSON.parse(this.responseText));
				console.log("Connecté");

		//Suppression du message d'erreur si l'appel a fonctionné//
			error = document.getElementById("erreur");
			if (error){
				error.remove();
				}
			} else {
				console.log("Une erreur avec la connexion API est survenue");
			}
		}
		request.open("GET", APIURL + idProduit);
		request.send();
	});
};

/*Création du HTML*/

		//Création de la liste de produits en vente sur la page d'accueil//
		async function listeTousProduits(){
		const produits = await getProduits();

		//Création de la section avec la liste des produits//
		let listeProduit = document.createElement("section")
		listeProduit.setAttribute("class", "liste-produit");

		let main = document.getElementById("bloc-page");
		main.appendChild(listeProduit);

		//Création de l'encadré HTML de chaque produit de l'API//
		produits.forEach((produit) =>
		{ 
      	//création des élements de la structure de la liste des produits//
      	//Une div conteneur/le nom/une image/le prix/le lien//
      	let produitBloc = document.createElement("div");
      	let produitNom = document.createElement("h2");
      	let produitImage = document.createElement("img");
		let produitDesc = document.createElement("div");
       	let produitPrix = document.createElement("p");
      	let produitLien = document.createElement("a");
		

      	//Ajout des attributs pour la création du style via le CSS//
      	produitBloc.setAttribute("class", "liste-produit_bloc");
		produitDesc.setAttribute("class", "produit-desc");
        produitImage.setAttribute("src", produit.imageUrl);
      	produitImage.setAttribute("alt", "photo du produit"); 
      	produitLien.setAttribute("href", "produit.html?id=" + produit._id);


     	//Bloc conteneur//
     	listeProduit.appendChild(produitBloc);
     	produitBloc.appendChild(produitNom);
     	produitBloc.appendChild(produitImage);
		produitBloc.appendChild(produitDesc);
		produitDesc.appendChild(produitPrix);
     	produitDesc.appendChild(produitLien);


      	//Contenu des balises//
		produitNom.textContent = produit.name;
      	produitPrix.textContent = produit.price / 100 + " euros";
      	produitLien.textContent = "En savoir plus";
      });
	};

/*Création de la page du produit sélectionné*/

	async function produitInfo(){
    //Collecter l'URL après le ?id= pour le récupérer uniquement sur l'API
    idProduit = location.search.substring(4);
    const produitSelect = await getProduits();
    console.log("Voici la page du produit id_"+produitSelect._id);

    //Faire apparaitre la fiche produit initialement en display none
    let section = document.getElementById("section");
    section.style.display = "bloc";
    
    //Remplissage de la fiche produit
    document.getElementById("photoProduit").setAttribute("src", produitSelect.imageUrl);
    document.getElementById("nomProduit").innerHTML = produitSelect.name;
    document.getElementById("descProduit").innerHTML = produitSelect.description;
    document.getElementById("prixProduit").innerHTML = produitSelect.price / 100 + " euros";

    
    //Selon le type de produit (ligne 3) création des options
    switch(produitVente){
    	case "lenses":
    	produitSelect.colors.forEach((produit)=>{
    		let optionProduit = document.createElement("option");
    		document.getElementById("optionSelect").appendChild(optionProduit).innerHTML = produit;
    	});
    	break;
    	case "furniture":
    	produitSelected.varnish.forEach((produit)=>{
    		let optionProduit = document.createElement("option");
    		document.getElementById("optionSelect").appendChild(optionProduit).innerHTML = produit;
    	});
    	break;
    	case "teddies":
    	produitSelected.colors.forEach((produit)=>{
    		let optionProduit = document.createElement("option");
    		document.getElementById("optionSelect").appendChild(optionProduit).innerHTML = produit;
    	});
    	break;
    	default:
    	console.log("Merci de renseigner la variable produitVente ligne 2 du fichier script.js");
    }
};