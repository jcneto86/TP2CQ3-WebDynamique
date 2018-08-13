var histoqueIdCards = 1;
var cards;
cards = [{
        "id": "card01",
        "titre": "titre",
        "contenu": ["contenu"],
        "type": "urgence_basse"
}];


function localStorageSave() {
    if (localStorage.getItem('cardsTaches') == null) {
        saveToLocalStorage();
    } else {
        porterVariables();
    }
}

function saveToLocalStorage() {
    localStorage.setItem('cardsTaches', JSON.stringify(cards));
    localStorage.setItem('histoqueIdCards', histoqueIdCards);
}

function porterVariables() {
    cards = JSON.parse(localStorage.getItem('cardsTaches'));
    histoqueIdCards = +localStorage.getItem('histoqueIdCards');
}

function isNone(id) {
    let element = document.getElementById(id);
    if (element.style.display === 'none') {
        element.style.display = 'block';
    } else {
        element.style.display = 'none';
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

/**
 *
 */
function addCard() {
    cards.push(
        {
            "id": "card0" + histoqueIdCards,
            "titre": "titre",
            "contenu": ["contenu"],
            "type": "urgence_basse"
        }
    );
    histoqueIdCards++;
    saveToLocalStorage();
    montrerCardAdd();
    log();
}


function effacerCard(id) {
    let card = document.getElementById(id);
    card.remove();
    for (let i = 0; i < cards.length; i++)
        if (cards[i].id === id) {
            cards.splice(i, 1);
        }
    saveToLocalStorage();
    log();
}

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

function changerType(id, type) {
    for (let i = 0; i < cards.length; i++)
        if (cards[i].id === id) {
            cards[i].type = type;
        }
    saveToLocalStorage();
}

function updateArrayCards(id) {

    var list = document.getElementById(id).childNodes;
    var theArray = [];
    for(var i=0;i < list.length; i++) {
        var arrValue = list[i].innerHTML;
        alert(arrValue);
        theArray.push(arrValue);
    }

    // let card = document.getElementById(id);
    // let titre = card.getElementsByTagName('h2').childNodes[0];
    // let contenu = card.getElementsByTagName('li').childNodes;
    // console.log(titre);
    // console.log(contenu);
    // for (let i = 0; i < cards.length; i++) {
    //     if (cards[i].id === id) {
    //         cards[i].titre = titre;
    //         cards[i].contenu = [];
    //         for (let j = 0; j < contenu.length; j++) {
    //             cards[i].contenu.push(contenu[j].innerHTML);
    //         }
    //     }
    // }


    saveToLocalStorage();
}

function chargerCards() {
    let container = document.getElementById('containerCards');
    for (let i = 0; i < cards.length; i++) {
        log();
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
    let container = document.getElementById('containerCards');
    let index = 2;
    log();
    if (cards.length === 0) {
        index = 0;
    } else {
        index = cards.length - 1;
    }
    console.log('Index : ' + index);
    let divCard = document.createElement('div');
    let titre = document.createElement('h2');
    let divTools = document.createElement('div');
    let buttonEdit = document.createElement('button');
    let buttonDelete = document.createElement('button');
    let list = document.createElement('ul');
    for (let j = 0; j < cards[index].contenu.length; j++) {
        let li = document.createElement('li');
        let textLi = document.createTextNode(cards[index].contenu[j]);
        li.appendChild(textLi);
        list.appendChild(li);
    }
    buttonEdit.className = 'edit float_left fas fa-palette';
    buttonEdit.setAttribute('onclick', 'changerUrgence(\'' + cards[index].id + '\')');
    buttonDelete.className = 'delete float_right fas fa-trash-alt';
    buttonDelete.setAttribute('onclick', 'effacerCard(\'' + cards[index].id + '\')');
    titre.setAttribute('contenteditable', 'true');
    titre.setAttribute('onfocusout', 'updateArrayCards(\'' + cards[index].id + '\')');
    list.setAttribute('contenteditable', 'true');
    list.setAttribute('onfocusout', 'updateArrayCards(\'' + cards[index].id + '\')');
    divTools.className = 'tools_cards';
    divCard.className = 'card ' + cards[index].type;
    divCard.id = cards[index].id;
    let ramplirTitle = document.createTextNode(cards[index].titre);
    titre.appendChild(ramplirTitle);
    divTools.appendChild(buttonDelete);
    divTools.appendChild(buttonEdit);
    divCard.appendChild(titre);
    divCard.appendChild(list);
    divCard.appendChild(divTools);
    container.appendChild(divCard);
}

function log() {

    console.log('Log : ');
    console.log('\nCards = ' + cards);
    console.log('\nCards length = ' + cards.length);
    console.log('\nHistoqueIdCards = ' + histoqueIdCards);
}


function starON() {
    localStorageSave();
    chargerCards();
}



