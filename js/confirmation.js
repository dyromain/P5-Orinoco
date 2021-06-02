  //Récupération des informations pour affichage sur la page de confirmation

  resultatCommande = () => {
	if (sessionStorage.getItem("order") != null) {
	  let order = JSON.parse(sessionStorage.getItem("order"));
	  document.getElementById("firstName").innerHTML = order.contact.firstName;
	  document.getElementById("orderId").innerHTML = order.orderId;
	  let totalAchat = JSON.parse(localStorage.getItem("montantTotal"));
	  document.getElementById("total-achat").innerHTML = totalAchat + "€";

	  console.log(order);
	  sessionStorage.removeItem("order");
	}

	//Redirection vers l'accueil
	else {
	  alert("Merci pour vote commande. A bientôt");
	  window.location = "./index.html";
	}
	localStorage.clear();
  };

  

