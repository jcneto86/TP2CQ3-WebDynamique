var cards = [
    id: 'card0' + histoqueIdCards,
    titre: "Vous tittre",
    contenu: "Vous tâches",
    type: "urgence_basse"
];
var histoqueIdCards = 1;



function localStorageSave() {

    try {
        chargerCards();
    } catch(e) {
        saveToLocalStorage();
    }

    // if (localStorageExist('cardsTaches')) {
    //     // oui
    //     chargerCards();
    //     montrerCards();
    // } else {
    //     // non
    //     saveToLocalStorage();
    // }
    montrerCards();
}

localStorageSave();


function saveToLocalStorage() {
    localStorage.setItem('cardsTaches', JSON.stringify(cards));
    localStorage.setItem('histoqueIdCards', histoqueIdCards);
}

function chargerCards() {
    cards = JSON.parse(localStorage.getItem('cardsTaches'));
    histoqueIdCards += +localStorage.getItem('histoqueIdCards');
}

function isNone(id) {
    var x = document.getElementById(id);
    if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
}

// {
//     id: "1",
//         titre: "titre id01",
//     contenu: "contenu id01",
//     type: "urgence_moyenne"
// },
// {
//     id: "2",
//         titre: "titre id02",
//     contenu: "contenu id02",
//     type: "urgence_moyenne"
// },
// {
//     id: "3",
//         titre: "titre id03",
//     contenu: "contenu id03",
//     type: "urgence_moyenne"
// },
// {
//     id: "4",
//     titre: "titre id04",
//     contenu: "contenu id04",
//     type: "urgence_moyenne"
// }

function addCard() {
    cards.push(
        {
            id: 'card0' + histoqueIdCards,
            titre: "titre",
            contenu: "contenu",
            type: "urgence_basse"
        }
    );
    histoqueIdCards++;
    localStorageSave();
    montrerCardAdd();
}

function addArrayCards(id) {
    cards.push(
        {
            id: 'card0' + histoqueIdCards,
            titre: document.getElementById(id).msGetInputContext('h2'),
            contenu: document.getElementById(id).msGetInputContext('p'),
            type: "urgence_basse"
        }
    )
}

function effacerCard(id) {
    let card = document.getElementById(id);
    card.remove();
    for (var i = 0; i < cards.length; i++)
        if (cards[i].id === id) {
            cards.splice(i, 1);
        }
    localStorageSave();
    console.log(cards)
}


function montrerCards() {
    for (let i = 0; i < cards.length; i++) {
        let divCard = document.createElement('div');
        let titre = document.createElement('h2');
        let contenuContent = document.createElement('p');
        let divTools = document.createElement('div');
        let buttonEdit = document.createElement('button');
        let buttonDelete = document.createElement('button');
        buttonEdit.className = 'edit float_left';
        buttonDelete.className = 'delete float_right';
        buttonDelete.setAttribute('onclick', 'effacerCard(\'' + cards[i].id + '\')');
        titre.setAttribute('contenteditable', 'true');
        contenuContent.setAttribute('contenteditable', 'true');
        contenuContent.setAttribute('onfocusout', 'myFunction()');
        divCard.className = 'card ' + cards[i].type;
        divCard.id = cards[i].id;
        let ramplirTitle = document.createTextNode(cards[i].titre);
        let ramplirContenu = document.createTextNode(cards[i].titre);
        titre.appendChild(ramplirTitle);
        contenuContent.appendChild(ramplirContenu);
        divTools.appendChild(buttonDelete);
        divTools.appendChild(buttonEdit);
        divCard.appendChild(titre);
        divCard.appendChild(contenuContent);
        divCard.appendChild(divTools);
        document.getElementById('containerCards').appendChild(divCard);
    }
}

// <div class="card urgence_moyenne">
//     <h2>Test</h2>
//         <p>
//         </P
//      <div class="tools_cards">
//          <button class="edit float_left"></button>
//          <button class="delete float_right"></button>
//     </div>
// </div>

function montrerCardAdd() {
    let index;
    if (cards.length === 0) {
        index = 0;
    } else {
        index = cards.length - 1;
    }

    let divCard = document.createElement('div');
    let titre = document.createElement('h2');
    let contenuContent = document.createElement('p');
    let divTools = document.createElement('div');
    let buttonEdit = document.createElement('button');
    let buttonDelete = document.createElement('button');
    divCard.className = 'card ' + cards[cards[index]].type;
    buttonEdit.className = 'edit float_left';
    buttonDelete.className = 'delete float_right';
    buttonDelete.setAttribute('onclick', 'effacerCard(\'' + cards[index].id + '\')');
    titre.setAttribute('contenteditable', 'true');
    contenuContent.setAttribute('contenteditable', 'true');
    contenuContent.setAttribute('onfocusout', 'myFunction()');
    divCard.id = cards[cards.length - 1].id;
    let ramplirTitle = document.createTextNode(cards[index].titre);
    let ramplirContenu = document.createTextNode(cards[index].contenu);
    titre.appendChild(ramplirTitle);
    contenuContent.appendChild(ramplirContenu);
    divTools.appendChild(buttonDelete);
    divTools.appendChild(buttonEdit);
    divCard.appendChild(titre);
    divCard.appendChild(contenuContent);
    divCard.appendChild(divTools);
    document.getElementById('containerCards').appendChild(divCard);
}

montrerCards();








