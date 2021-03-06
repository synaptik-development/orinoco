//---------------------------------------------------------------------------------------------//
// gestion du panier (local storage)
//---------------------------------------------------------------------------------------------//

/*
 traiement panier vide (liens bloqués)
*/
function emptyPanier() {
  let panier = localStorage.panier;
  if (panier) {
    window.location.href = "panier.html";
  } else {
    alert("Votre panier est vide !");
  }
}

/* 
ajouter au panier 
*/
function insertInShoppingCart(lineProduct) {
  if (optionSelected() == "choose an option") {
    alert("Veuillez choisir une option !");
  } else {
    product.push(lineProduct);
    addArticle();
    if (confirm(`Article ajouté au panier. Voir mon panier.`)) {
      window.location.href = "panier.html";
    } else {
      window.location.href = "index.html";
    }
  }
}

/*
récupération de l'option sélectionnée 
*/
function optionSelected() {
  const list = document.querySelector("#options");
  return list[options.selectedIndex].value;
}

/* 
gestion des quantités 
*/
function addArticle() {
  const storage = localStorage.panier;
  // création de l'article //
  let article = product[0];

  // si localstorage est vide création du panier et envois de l'article //
  if (!storage) {
    panier = [];
    panier.push(article);
    localStorage.setItem("panier", JSON.stringify(panier));
  }
  // sinon //
  else {
    // check si le modèle courant est absent on l'envoi dans le panier //
    let parsePanier = JSON.parse(storage);
    const modelExist = parsePanier.find((article) => article._id == id && article._lenses == optionSelected());
    if (!modelExist) {
      parsePanier.push(article);
    }
    // si il est dans le tableau, on l'incrémente //
    else {
      for (let index in parsePanier) {
        if (parsePanier[index]._id == id && parsePanier[index]._lenses == optionSelected()) {
          parsePanier[index]._quantity++;
        }
      }
    }

    // envoi du panier dans localstorage //
    localStorage.setItem("panier", JSON.stringify(parsePanier));
  }
}

//---------------------------------------------------------------------------------------------//
// gestion du formulaire
//---------------------------------------------------------------------------------------------//

/* 
traitement qualité des champs
(firstname, lastname, city) 
*/
function testRegexGeneral(input, message) {
  let validate = true;
  let regexGeneral = /^[^0-9@&"()!_$*€£`+=\/;?#]+$/;
  if (!regexGeneral.test(input)) {
    erreur = message;
    validate = false;
  }
  return validate;
}

function testRegexEmail(input, message) {
  let validate = true;
  let regexEmail = /[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})/;
  if (regexEmail.test(input) == false) {
    erreur = message;
    validate = false;
  }
  return validate;
}

/*
traitement qualité du champs (cp)
*/
function testInputLength(input) {
  let validate = true;
  if (input.length != 5) {
    erreur = "*code postal invalide !";
    validate = false;
  }
  return validate;
}

/*
traitement champs vides 
*/
function checkEmptyInputs(input) {
  let validate = true;
  if (!input.value) {
    erreur = "*veuillez renseigner tous les champs !";
    input.style.border = "2px solid red";
    validate = false;
  } else {
    input.style.border = "1px solid black";
  }
  return validate;
}
