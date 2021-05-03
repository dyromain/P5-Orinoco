function teddy() {
    fetch("http://localhost:3000/api/teddies")
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value) {
      document
          .getElementById("button")
          .innerText = value.queryString.greetings;
    })
    .catch(function(err) {
      // Une erreur est survenue
    });
  }
  
  document
    .getElementById("button")
    .addEventListener("click", teddy);