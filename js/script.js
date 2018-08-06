var histoqueIdCards = 1;
var cards;
cards = [

    {
        id: "card01",
        titre: "titre card01",
        contenu: ["contenu"],
        type: "urgence_basse"
    }

];
console.log(cards);


function localStorageSave() {

    try {
        porterCards();
    } catch (e) {
        saveToLocalStorage();
    }
    chargerCards();
}

function saveToLocalStorage() {
    localStorage.setItem('cardsTaches', JSON.stringify(cards));
    localStorage.setItem('histoqueIdCards', histoqueIdCards);
}

function porterCards() {
    cards = JSON.parse(localStorage.getItem('cardsTaches'));
    histoqueIdCards += +localStorage.getItem('histoqueIdCards');
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

function addCard() {
    cards.push(
        {
            id: "card0" + histoqueIdCards,
            titre: "titre",
            contenu: ["contenu"],
            type: "urgence_basse"
        }
    );
    histoqueIdCards++;
    localStorageSave();
    montrerCardAdd();
    console.log(cards)
}


function effacerCard(id) {
    let card = document.getElementById(id);
    card.remove();
    for (let i = 0; i < cards.length; i++)
        if (cards[i].id === id) {
            cards.splice(i, 1);
        }
    localStorageSave();
    console.log(cards);
}

function chargerCards() {
    let container = document.getElementById('containerCards');
    for (let i = 0; i < cards.length; i++) {
        console.log(cards[i].contenu.length);
        alert(cards[i].contenu.length);
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
        buttonEdit.className = 'edit float_left';
        buttonDelete.className = 'delete float_right';
        buttonDelete.setAttribute('onclick', 'effacerCard(\'' + cards[i].id + '\')');
        titre.setAttribute('contenteditable', 'true');
        list.setAttribute('contenteditable', 'true');
        list.setAttribute('onfocusout', 'updateArrayCards(\'' + cards[i].id + '\')');
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
    let index;
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
    buttonEdit.className = 'edit float_left';
    buttonDelete.className = 'delete float_right';
    buttonDelete.setAttribute('onclick', 'effacerCard(\'' + cards[index].id + '\')');
    titre.setAttribute('contenteditable', 'true');
    list.setAttribute('contenteditable', 'true');
    list.setAttribute('onfocusout', 'updateArrayCards(\'' + cards[index].id + '\')');
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


function starON() {
    localStorageSave();
    chargerCards();
    console.log(cards[0].contenu.length);
}




