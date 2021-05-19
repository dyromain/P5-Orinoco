/*Génération de l'URL de l'API*/

const produitsVente = "teddies"
const URLAPI = "http://localhost:3000/api/" + produitsVente + "/";

//id du produit pour pouvoir effectuer un tri dans l'API//

let idProduit = "";

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
		request.open("GET", URLAPI + idProduit);
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

	async function infoProduit(){
    //Récupération de l'URL suivi du ?id=//
    idProduit = location.search.substring(4);
    const produitSelect = await getProduits();
    console.log("Voici la page du produit id_"+produitSelect._id);

    //Affichage de la page du produit//
    let section = document.getElementById("section");
    section.style.display = "block";
    
    //Elements de la page du produit//
    document.getElementById("photoProduit").setAttribute("src", produitSelect.imageUrl);
    document.getElementById("nomProduit").innerHTML = produitSelect.name;
    document.getElementById("descProduit").innerHTML = produitSelect.description;
    document.getElementById("prixProduit").innerHTML = produitSelect.price / 100 + " euros";

    
    //Création des options selon le type de produit (ligne 3)//
    switch(produitsVente){
		case "teddies":
    	produitSelect.colors.forEach((produit)=>{
    		let optionProduit = document.createElement("option");
    		document.getElementById("choixOption").appendChild(optionProduit).innerHTML = produit;
    	});
		break;
    	case "lenses":
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
    	console.log("Merci d'ajouter une variable produitsVente à ligne 3 du fichier index.js");
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
		const produits = await getProduits();
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

/*Page Panier*/

pagePanier = () => {
	if (panierUser.length > 0) {
	  document.getElementById("panierVide").remove();
  
	  //Tableau récapitulatif//
	  let resume = document.createElement("table");
	  let ligne = document.createElement("tr");
	  let resumeImg = document.createElement("th");
	  let resumeNom = document.createElement("th");
	  let resumePrixIndiv = document.createElement("th");
	  let resumeSuppr = document.createElement("th");
	  let totalLigne = document.createElement("tr");
	  let totalColonne = document.createElement("th");
	  let resumePrixaPayer = document.createElement("td");
  
	  //Placement de la structure dans la page
	  let resumePanier = document.getElementById("resumePanier");
	  resumePanier.appendChild(resume);
	  resume.appendChild(ligne);
	  ligne.appendChild(resumeImg);
	  ligne.appendChild(resumeNom);
	  ligne.appendChild(resumePrixIndiv);
	  ligne.appendChild(resumeSuppr);
  
	  //Entêtes 
	  resumeImg.textContent = "Sélection";
	  resumeNom.textContent = "Nom";
	  resumePrixIndiv.textContent = "Prix";
	  resumeSuppr.textContent = "Retirer ?";
  
  
	//Boucle FOR pour affichage des articles dans le panier
	 for (let i = 0; i<panierUser.length; i++) {
	  
	//Création des lignes du tableau
	let ligneProduit = document.createElement("tr");
	let imgProduit = document.createElement("img");
	let nomProduit = document.createElement("td");
	let prixIndivProduit = document.createElement("td");
	let supprProduit = document.createElement("td");
	let retirerProduit = document.createElement("i");
		  
	//Attribution des class ou Id
	ligneProduit.setAttribute("id", "produit" + [i]);
	imgProduit.setAttribute("class", "img-produit");
	imgProduit.setAttribute("src", panierUser[i].imageUrl);
	imgProduit.setAttribute("alt", "Photo du produit commandé");
	retirerProduit.setAttribute("id", "suppr" + [i]);
	retirerProduit.setAttribute("class", "fas fa-times-circle");
	retirerProduit.setAttribute("title", "Retirer le produit ?");
	  
	console.log(i);

	
	//Supprimer un produit du panier
	retirerProduit.addEventListener("click", (event) => {this.retraitProduit(i);})
   
    
    //Structure HTML
	resume.appendChild(ligneProduit);
	ligneProduit.appendChild(imgProduit);
	ligneProduit.appendChild(nomProduit);
	ligneProduit.appendChild(prixIndivProduit);
	ligneProduit.appendChild(supprProduit);
	supprProduit.appendChild(retirerProduit);

	//Contenu de chaque ligne
	nomProduit.textContent = panierUser[i].name;
	prixIndivProduit.textContent = panierUser[i].price / 100 + " €";
	console.log(panierUser[i].name);

};

	//Ligne Total
	resume.appendChild(totalLigne);
	totalLigne.appendChild(totalColonne);
	totalLigne.setAttribute("id", "sommeTotale");
	totalColonne.textContent = "Montant total";
	totalLigne.appendChild(resumePrixaPayer);

	resumePrixaPayer.setAttribute("id", "montantTotal");
	totalColonne.setAttribute("id", "totalColonne");

	//Calcul de l'addition total
	let montantTotal = 0;
	panierUser.forEach((panierUser) => {
	montantTotal += panierUser.price / 100;
	});

	//Affichage du prix total à payer dans l'addition
	console.log(montantTotal);
	document.getElementById("montantTotal").textContent = montantTotal + " €";
	}
	};

	retraitProduit = (i) => {
	panierUser.splice(i, 1);
	localStorage.clear();
	//Mise à jour du nouveau panier avec suppression de l'article
	localStorage.setItem("panierUser", JSON.stringify(panierUser));
	//Mise à jour de la page pour affichage de la suppression au client
	window.location.reload();
	};  

	/*
/*Formulaire*/ 

	//Vérification du contenu inséré dans le formulaire /* 
	verifContenu = () => {
	let verifNombre = /[0-9]/;
	let verifMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	let verifCaractereSpec = /[§!@#$%^&*().?":{}|<>]/; 
  
	//Message à la fin des vérifications
	let verifMessage = "";
  
	//Récupération du contenu inséré
  	let nom = document.getElementById("nom").value;
	let prenom = document.getElementById("prenom").value;
	let email = document.getElementById("email").value;
	let adresse = document.getElementById("adresse").value;
	let ville = document.getElementById("ville").value;
  
	//Tests du contenu inséré dans le formulaire
	//Test du nom
	if (
	  verifNombre.test(nom) == true ||
	  verifCaractereSpec.test(nom) == true ||
	  nom == ""
	) {
	  verifMessage = "Les caractères spéciaux et les chiffres ne sont pas autorisés. Merci de vérifier les données saisies.";
	} else {
	  console.log("Nom valide");
	}
	//Test du prénom
	if (
	  verifNombre.test(prenom) == true ||
	  verifCaractereSpec.test(prenom) == true ||
	  prenom == ""
	) {
	  verifMessage = verifMessage + "\n" + "Les caractères spéciaux et les chiffres ne sont pas autorisés. Merci de vérifier les données saisies.";
	} else {
	  console.log("Prénom valide");
	}
	//Test du mail
	if (verifMail.test(email) == false) {
	verifMessage = verifMessage + "\n" + "Les caractères spéciaux et les chiffres ne sont pas autorisés. Merci de vérifier les données saisies.";
	} else {
	  console.log("Adresse e-mail valide");
	}
	//Test de l'adresse
	if (verifCaractereSpec.test(adresse) == true || adresse == "") {
	verifMessage = verifMessage + "\n" + "Les caractères spéciaux et les chiffres ne sont pas autorisés. Merci de vérifier les données saisies.";
	} else {
	  console.log(" Adresse postale valide");
	}
	//Test de la ville
	if (
	  (verifCaractereSpec.test(ville) == true ||
	  verifMessage.test(ville) == true) ||
	  ville == ""
	) {
	  verifMessage = verifMessage + "\n" + "Les caractères spéciaux et les chiffres ne sont pas autorisés. Merci de vérifier les données saisies.";
	} else {
	  console.log("Ville valide");
	}
	//S'il y a une erreur : affichage d'un message d'alerte
	if (verifMessage != "") {
	  alert("Attention :" + "\n" + verifMessage);
	}
	//Si le formulaire ne comporte aucune erreur : construction d'un objet contact
	else {
	  contact = {
		lastName: nom,
		firstName: prenom,
		address: adresse,
		city: ville,
		email: email,
	  };
	  return contact;
	}
  };
  
  //Vérification du panier
  verifPanier = () => {
	//Un produit minimum requis dans le panier
	let panierStatut = JSON.parse(localStorage.getItem("panierUser"));
	//Si le panier est vide ou null
	if (panierStatut.length < 1 || panierStatut == null) {
	  alert("Votre panier est vide");
	  return false;
	} else {
	  console.log("Le panier n'est pas vide");
	  return true;
	}
  };
  
/*Envoi du formulaire*/
  //Fonction request POST de l'API /*
  envoiForm = (formRequest) => {
  return new Promise((resolve)=>{
	let request = new XMLHttpRequest();
	request.onreadystatechange = function() {
	if (this.readyState == XMLHttpRequest.DONE && this.status == 201) 
	{
  //Sauvegarde du retour de l'API dans la sessionStorage pour affichage dans confirmation.html
	sessionStorage.setItem("order", this.responseText);

  //Chargement de la page de confirmation
	document.forms["form-info"].action = './confirmation.html';
	document.forms["form-info"].submit();

	resolve(JSON.parse(this.responseText));
	}
};
request.open("POST", URLAPI + "order");
request.setRequestHeader("Content-Type", "application/json");
request.send(formRequest);
});
};
  
  confirmCommande = () => {
	//Ecoute de l'event click du formulaire
	let btnConfirm = document.getElementById("form");
	btnConfirm.addEventListener("click", function(){
	//Vérification du panier et du formulaire
	if (verifPanier() == true && verifContenu() != null) {
	console.log("L'envoi peut être effectué");
  
	//Création de l'objet à envoyer
	let commande = {
	    contact,
		products
	};
	//Conversion en JSON
	let envoiForm = JSON.stringify(commande);
	envoiForm(envoiForm, URLAPI);
	console.log(commande);
   
	//Une fois la commande effectuée retour à l'état initial des tableaux/objet/localStorage
	contact = {};
	products = [];
	localStorage.clear();
	} else {
	console.log("Erreur");
	  }
	});
  }; 
  
  /*//Affichage des informations sur la page de confirmation
  resultatCommande = () => {
	if (sessionStorage.getItem("order") != null) {
	//Parse de la session storage
	  let order = JSON.parse(sessionStorage.getItem("order"));
	//Implantation de prénom et de l'id de commande dans le html sur la page de confirmation
	  document.getElementById("firstName").innerHTML = order.contact.firstName;
	  document.getElementById("orderId").innerHTML = order.orderId;
	  console.log(order);

	//Suppression de la clé du sessionStorage pour renvoyer au else si actualisation de la page ou via url direct
	  sessionStorage.removeItem("order");
	}
	//Redirection vers l'accueil
	else {
	  alert("Aucune commande n'a été effectuée.");
	  window.location = "./index.html";
	}
  }; /* */
  
  /*//------Tableau de recap de la commande dans la page de confirmation------// /*
  
  confirmRecap = () => {
	//Création de la structure du tableau récapitulatif
	let recapConfirm = document.createElement("table");
	let ligneConfirm = document.createElement("tr");
	let confirmPhoto = document.createElement("th");
	let confirmNom = document.createElement("th");
	let confirmPrixUnitaire = document.createElement("th");
	let ligneConfirmTotal = document.createElement("tr");
	let colonneConfirmTotal = document.createElement("th");
	let confirmPrixPaye = document.createElement("td");
  
	//Placement de la structure dans la page
	let confirmPanier = document.getElementById("confirmation-recap");
	confirmPanier.appendChild(recapConfirm);
	recapConfirm.appendChild(ligneConfirm);
	ligneConfirm.appendChild(confirmPhoto);
	ligneConfirm.appendChild(confirmNom);
	ligneConfirm.appendChild(confirmPrixUnitaire); /*
  
	//contenu des entetes
	confirmPhoto.textContent = "Article";
	confirmNom.textContent = "Nom";
	confirmPrixUnitaire.textContent = "Prix";
  
	//Incrémentation de l'id des lignes pour chaque produit
	let i = 0;
	let order = JSON.parse(sessionStorage.getItem("order"));
  
	order.products.forEach((orderArticle) => {
	  //Création de la ligne
	  let ligneConfirmArticle = document.createElement("tr");
	  let photoConfirmArticle = document.createElement("img");
	  let nomConfirmArticle = document.createElement("td");
	  let prixUnitConfirmArticle = document.createElement("td");
  
	  //Attribution des class pour le css
	  ligneConfirmArticle.setAttribute("id", "article_acheté" + i);
	  photoConfirmArticle.setAttribute("class", "photo_article_acheté");
	  photoConfirmArticle.setAttribute("src", orderArticle.imageUrl);
	  photoConfirmArticle.setAttribute("alt", "Photo de l'article acheté");
  
	  //Insertion dans le HTML
	  recapConfirm.appendChild(ligneConfirmArticle);
	  ligneConfirmArticle.appendChild(photoConfirmArticle);
	  ligneConfirmArticle.appendChild(nomConfirmArticle);
	  ligneConfirmArticle.appendChild(prixUnitConfirmArticle);
  
	  //Contenu des lignes
  
	  nomConfirmArticle.textContent = orderArticle.name;
	  prixUnitConfirmArticle.textContent = orderArticle.price / 100 + " €";
	});
  
	//Dernière ligne du tableau : Total
	recapConfirm.appendChild(ligneConfirmTotal);
	ligneConfirmTotal.appendChild(colonneConfirmTotal);
	ligneConfirmTotal.setAttribute("id", "ligneSomme");
	colonneConfirmTotal.textContent = "Total payé";
	ligneConfirmTotal.appendChild(confirmPrixPaye);
  
	confirmPrixPaye.setAttribute("id", "sommeConfirmTotal");
	confirmPrixPaye.setAttribute("colspan", "4");
	colonneConfirmTotal.setAttribute("id", "colonneConfirmTotal");
	colonneConfirmTotal.setAttribute("colspan", "2");
  
	//Calcule de l'addition total
	let sommeConfirmTotal = 0;
	order.products.forEach((orderArticle) => {
	  sommeConfirmTotal += orderArticle.price / 100;
	});
  
	//Affichage du prix total à payer dans l'addition
	console.log(sommeConfirmTotal);
	document.getElementById("sommeConfirmTotal").textContent =
	  sommeConfirmTotal + " €";
  };
  */ /* */ /* /* */
