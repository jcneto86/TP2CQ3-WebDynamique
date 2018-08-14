// variable qui garde le nombre de cartes créées
let histoqueIdCards = 1;
// tableau de la carte
let cards;
cards = [{
        "id": "card" + histoqueIdCards,
        "titre": "Cliquez ici pour éditer le titre",
        "contenu": ["Cliquez ici pour éditer le contenu"],
        "type": "urgence_basse"
}];

/** function localStorageSave()
 *
 * Fonction qui vérifie si les données ont déjà été enregistrées.
 * Si oui, les données sont chargées, sinon les données initiales sont enregistrées.
 *
 */
function localStorageSave() {
    if (localStorage.getItem('cardsTaches') == null) {
        saveToLocalStorage();
    } else {
        importerVariables();
    }
}

/** function saveToLocalStorage()
 *
 * Fonction qui enregistre les variables cards et histoqueIdCards dans le localStorage.
 *
 */
function saveToLocalStorage() {
    localStorage.setItem('cardsTaches', JSON.stringify(cards));
    localStorage.setItem('histoqueIdCards', histoqueIdCards);
}

/** function importerVariables()
 *
 * Fonction qui importe respectivement les valeurs cardsTaches et histoqueIdCards
 * enregistrées dans lelocalStorage vers les variables cards et histoqueIdCards respectives.
 *
 */
function importerVariables() {
    cards = JSON.parse(localStorage.getItem('cardsTaches'));
    histoqueIdCards = +localStorage.getItem('histoqueIdCards');
}

/** function isNone(id)
 *
 * Fonction qui reçoit un ID et échange de la propriété display entre
 * none et block de l'élément HTML identifié avec l'ID reçu.
 *
 */
function isNone(id) {
    let element = document.getElementById(id);
    if (element.style.display === 'none') {
        element.style.display = 'block';
    } else {
        element.style.display = 'none';
    }
}

/** function addCard()
 *
 * Fonction qui ajoute un modèle de carte à la tableau, implémente histoqueIdCards
 * et recharge les cartes sur l'écran.
 *
 */
function addCard() {
    cards.push(
        {
            "id": "card" + histoqueIdCards,
            "titre": "Cliquez ici pour éditer le titre",
            "contenu": ["Cliquez ici pour éditer le contenu"],
            "type": "urgence_basse"
        }
    );
    histoqueIdCards++;
    saveToLocalStorage();
    chargerCards();
}

/** function effacerCard(id)
 *
 * Fonction qui reçoit un ID, supprime l'élément HTML avec le même
 * ID, supprime de la tableau l'élément avec cet identifiant et recharge l'écran
 *
 */
function effacerCard(id) {
    let card = document.getElementById(id);
    card.remove();
    for (let i = 0; i < cards.length; i++)
        if (cards[i].id === id) {
            cards.splice(i, 1);
        }
    saveToLocalStorage();
}
/** function changerUrgence(id)
 *
 * Fonction qui reçoit un ID et change les classes de l'élément HTML avec cet identifiant.
 *
 */
function changerUrgence(id) {
    let card = document.getElementById(id);
    if (card.className === 'card urgence_basse') {
        document.getElementById(id).className = 'card urgence_moyenne';
        changerType(id, 'urgence_moyenne');
    }
    else if (card.className === 'card urgence_moyenne') {
        document.getElementById(id).className = 'card urgence_haute';
        changerType(id, 'urgence_haute');
    } else {
        document.getElementById(id).className = 'card urgence_basse';
        changerType(id, 'urgence_basse');
    }
}

/** function changerType(id, type)
 *
 * Fonction qui reçoit un ID et un type pour changer le type de la carte dans le tableau qui
 * a le même ID.
 *
 */
function changerType(id, type) {
    for (let i = 0; i < cards.length; i++)
        if (cards[i].id === id) {
            cards[i].type = type;
        }
    saveToLocalStorage();
}

/** function updateArrayCards(id)
 *
 * Fonction qui reçoit un identifiant, récupère les données des balises "h2" et "li"
 * et enregistrées h2 comme title et li comme contenu dans la tableau où la carte a le même ID.
 *
 */
function updateArrayCards(id) {
    let card = document.getElementById(id);
    let titre = card.getElementsByTagName('h2');
    let contenu = card.getElementsByTagName('li');
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].id === id) {
            cards[i].titre = titre[0].innerText;
            cards[i].contenu = [];
            for (let j = 0; j < contenu.length; j++) {
                cards[i].contenu.push(contenu[j].innerText);
            }
        }
    }
    saveToLocalStorage();
}

/** function chargerCards()
 *
 * Fonction qui crée des éléments HTML pour représenter chaque cartes enregistrées dans le
 * tableau et chargée l'écran.
 *
 */
function chargerCards() {
    let container = document.getElementById('containerCards');
    container.innerHTML = '';
    for (let i = 0; i < cards.length; i++) {
        let divCard = document.createElement('div');
        let titre = document.createElement('h2');
        let divTools = document.createElement('div');
        let buttonEdit = document.createElement('button');
        let buttonDelete = document.createElement('button');
        let list = document.createElement('ul');
        for (let j = 0; j < cards[i].contenu.length; j++) {
            let li = document.createElement('li');
            let textLi = document.createTextNode(cards[i].contenu[j]);
            li.appendChild(textLi);
            list.appendChild(li);
        }
        buttonEdit.className = 'edit float_left fas fa-palette';
        buttonEdit.setAttribute('onclick', 'changerUrgence(\'' + cards[i].id + '\')');
        buttonDelete.className = 'delete float_right fas fa-trash-alt';
        buttonDelete.setAttribute('onclick', 'effacerCard(\'' + cards[i].id + '\')');
        titre.setAttribute('contenteditable', 'true');
        titre.setAttribute('onfocusout', 'updateArrayCards(\'' + cards[i].id + '\')');
        list.setAttribute('contenteditable', 'true');
        list.setAttribute('onfocusout', 'updateArrayCards(\'' + cards[i].id + '\')');
        divTools.className = 'tools_cards';
        divCard.className = 'card ' + cards[i].type;
        divCard.id = cards[i].id;
        let ramplirTitle = document.createTextNode(cards[i].titre);
        titre.appendChild(ramplirTitle);
        divTools.appendChild(buttonDelete);
        divTools.appendChild(buttonEdit);
        divCard.appendChild(titre);
        divCard.appendChild(list);
        divCard.appendChild(divTools);
        container.appendChild(divCard);
    }
}
/** function starON()
 *
 * Fonction qui est réalisée en début de chargement de la page.
 *
 */
function starON() {
    localStorageSave();
    chargerCards();
}



