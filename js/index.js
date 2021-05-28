/*Génération de l'URL de l'API*/

const produitsVente = "teddies"
const URLAPI = "http://localhost:3000/api/" + produitsVente + "/";

//id du produit pour pouvoir effectuer un tri dans l'API//

let produitID = "";

/*Appel de l'API*/

getProducts = () =>{
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
		request.open("GET", URLAPI + produitID);
		request.send();
	});
};

/*Création du HTML*/

		//Création de la liste de produits en vente sur la page d'accueil//
		async function listeTousProduits(){
		const produits = await getProducts();

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
  
  
	//Boucle FOR pour affichage des produits dans le panier
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
	//Mise à jour du nouveau panier avec suppression du produit
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
	  console.log("Adresse postale valide");
	}
	//Test de la ville
	if (
	  (verifCaractereSpec.test(ville) == true ||
	  verifNombre .test(ville) == true) ||
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
		console.log("Le panier n'est pas vide")
		return true;
	}
};

/*Envoi du formulaire*/

  //Fonction request post de l'API
  envoiForm = (formRequest) => {
	return new Promise((resolve)=>{
		let request = new XMLHttpRequest();
		request.onreadystatechange = function() {
			if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
		//Sauvegarde du retour de l'API dans la sessionStorage --> affichage dans confirmation.html
		sessionStorage.setItem("order", this.responseText);
		window.location.href="./confirmation.html";
        resolve(JSON.parse(this.responseText));
        console.log(this.status);
    }
};
		request.open("POST", APIURL + "order");
		request.setRequestHeader("Content-Type", "application/json");
		request.send(formRequest);
		console.log(formRequest)
});
};

//Au click sur le bouton "Commander" du formulaire
validerCommande = () =>{
  //Ecoute de l'event click du formulaire
  let commande = document.getElementById("formConfirm");
  commande.addEventListener("click", function(){
	//Lancement des verifications du panier et du formulaire => Construction du tableau products envoyé à l'API
	if(verifPanier() == true && verifContenu() != null){
		console.log("L'envoi peut être effectué");
		panierUser.forEach((product) => {
		products.push(product._id);
	});
		console.log(products);

	//Création de l'objet à envoyer
	let objet = {
		contact,
		products
	};
	console.log(objet);
   //Conversion en JSON
   let formRequest = JSON.stringify(objet);
   console.log(formRequest);
   //Envoi de l'objet via la function
   envoiForm(formRequest);

   //Une fois la commande passée : retour à l'état initial des tableaux/objet/localStorage
   contact = {};
   products = [];
   localStorage.clear();
   console.log("Localstorage vidé");
} else {
   console.log("Erreur");
};
});
};
  
  //Récupération des informations pour affichage sur la page de confirmation
  resultatCommande = () => {
	if (sessionStorage.getItem("order") != null) {
	  let order = JSON.parse(sessionStorage.getItem("order"));
	  document.getElementById("firstName").innerHTML = order.contact.firstName;
	  document.getElementById("orderId").innerHTML = order.orderId;
	  console.log(order);
	  sessionStorage.removeItem("order");
	}
	//Redirection vers l'accueil
	else {
	  alert("Merci pour vote commande. A bientôt");
	  window.location = "./index.html";
	}
  };

//------Tableau de recap de la commande dans la page de confirmation------// /*

confirmListe = () => {
  //Création de la structure du tableau récapitulatif
  //Tableau récapitulatif//
  let confirmResume = document.createElement("table");
  let confirmLigne = document.createElement("tr");
  let confirmImg = document.createElement("th");
  let confirmNom = document.createElement("th");
  let confirmPrixIndiv = document.createElement("th");
  let confirmLigneTotal = document.createElement("tr");
  let confirmColonneTotal = document.createElement("th");
  let confirmPrixTotal = document.createElement("td");

  //Structure dans la page
  let confirmPanier = document.getElementById("resumeCommande");
  confirmPanier.appendChild(confirmResume);
  confirmResume.appendChild(confirmLigne);
  confirmLigne.appendChild(confirmImg);
  confirmLigne.appendChild(confirmNom);
  confirmLigne.appendChild(confirmPrixIndiv);

  //Entêtes
  confirmImg.textContent = "Produit";
  confirmNom.textContent = "Nom";
  confirmPrixIndiv.textContent = "Prix";

  //Incrémentation de l'id des lignes pour chaque produit
  let i = 0;
  let order = JSON.parse(sessionStorage.getItem("order"));

  order.products.forEach((orderProduct) => {

  //Création de la ligne
  let confirmLigneProduit = document.createElement("tr");
  let confirmImgProduit = document.createElement("img");
  let confirmNomProduit = document.createElement("td");
  let confirmPrixIndivProduit = document.createElement("td");

  //Attribution des class pour le css
  confirmLigneProduit.setAttribute("id", "produit-commande" + i);
  confirmImgProduit.setAttribute("class", "produit-img-commande");
  confirmImgProduit.setAttribute("src", orderProduct.imageUrl);
  confirmImgProduit.setAttribute("alt", "Photo du produit commandé");

  //Insertion dans le HTML
  confirmResume.appendChild(confirmLigneProduit);
  confirmLigneProduit.appendChild(confirmImgProduit);
  confirmLigneProduit.appendChild(confirmNomProduit);
  confirmLigneProduit.appendChild(confirmPrixIndivProduit);

  //Contenu des lignes
  confirmNomProduit.textContent = orderProduct.name;
  confirmPrixIndivProduit.textContent = orderProduct.price / 100 + " €";
  });

  //Dernière ligne du tableau : Total
  confirmResume.appendChild(confirmLigneProduit);
  confirmLigneTotal.appendChild(confirmColonneTotal);
  confirmLigneTotal.setAttribute("id", "ligne-total");
  confirmColonneTotal.textContent = "Montant total";
  confirmLigneTotal.appendChild(confirmPrixTotal);

  confirmPrixTotal.setAttribute("id", "additionTotal");
  confirmColonneTotal.setAttribute("id", "colonneConfirmTotal");

  //Calcule de l'addition total
  let additionTotal = 0;
  order.products.forEach((orderProduct) => {
  additionTotal += orderProduct.price / 100;
  });

  //Affichage du prix total à payer dans l'addition
  console.log(additionTotal);
  document.getElementById("additionTotal").textContent =
  additionTotal + " €";
};
