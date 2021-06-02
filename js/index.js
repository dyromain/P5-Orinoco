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
