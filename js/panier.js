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

	resumePrixaPayer.setAttribute("id", "total-achat");
	totalColonne.setAttribute("id", "totalColonne");

	//Calcul de l'addition total
	let montantTotal = 0;
	panierUser.forEach((panierUser) => {
	montantTotal += panierUser.price / 100;
	});

	//Affichage du prix total à payer dans l'addition
	console.log(montantTotal);
	document.getElementById("total-achat").textContent = montantTotal + " €";
	localStorage.setItem("montantTotal", JSON.stringify(montantTotal));
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
	let verifCaractereSpec = /[§!@#$%^&*().?":{}|<>+]/; 
  
	//Message à la fin des vérifications
	let verifMessage = "Les caractères spéciaux et les chiffres ne sont pas autorisés, et le formulaire doit être entièrement complété. Merci de vérifier les données saisies.";
  
	//Récupération du contenu inséré
  	let nom = document.getElementById("nom").value;
	let prenom = document.getElementById("prenom").value;
	let email = document.getElementById("email").value;
	let adresse = document.getElementById("adresse").value;
	let ville = document.getElementById("ville").value;
  
	//Tests du contenu inséré dans le formulaire
	function verifInputValue(regex, inputValue){
			 
		if(inputValue !== ""){ 
		
		   return  regex.test(inputValue);

		}

		
		return "";

	}


	if(["", true].includes(verifInputValue(verifNombre, nom)) === true || ["", true].includes(verifInputValue(verifNombre, prenom)) === true
	|| ["", true].includes(verifInputValue(verifNombre, ville)) === true || ["", false].includes(verifInputValue(verifMail, email)) === true ||
	["", true].includes(verifInputValue(verifCaractereSpec, nom)) === true || ["", true].includes(verifInputValue(verifCaractereSpec, prenom)) === true || 
	["", true].includes(verifInputValue(verifCaractereSpec, ville)) === true || ["", true].includes(verifInputValue(verifCaractereSpec, adresse)) === true)
	{
		alert(verifMessage)
		
	}	else{
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
			else {
				console.log("Erreur");
			}
};
		request.open("POST", URLAPI + "order");
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
  
   console.log("Localstorage vidé");
} else {
   console.log("Erreur");
};
});
};