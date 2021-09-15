const lodash = require('lodash');

const participants_tournoi = require('./participants.json')
const combattant = require('./combattant.json')
const { pourcentage_book } = require('./config.json')

//déclare qui est le gagnant
const gagnant = combattant[1].name

//déclare les tableaux de chaques catégories
var participants_win = []
var participants_def = []
var amount_win_tab = []
var amount_def_tab = []

var index = 1
for (var i = 0; i < Object.keys(participants_tournoi).length; i++) {

    //trie les participants, par nom voté
    if (participants_tournoi[index].vote === gagnant){
        participants_win.push(
            {
                name: participants_tournoi[index].name ,
                prix: parseInt(participants_tournoi[index].prix)
            }   
        )
        amount_win_tab.push(parseInt(participants_tournoi[index].prix))
    }
    else {
        participants_def.push(
            {
                name: participants_tournoi[index].name,
                prix: parseInt(participants_tournoi[index].prix)
            }
        )
        amount_def_tab.push(parseInt(participants_tournoi[index].prix))
    }

    index++
}
var amount_win = lodash.sum(amount_win_tab);
var amount_def = lodash.sum(amount_def_tab);

//retire le pourcentage qui est configurable 
const somme_retiré = pourcentage_book * amount_def / 100
amount_def = amount_def - somme_retiré

var ind = 0
var resultpourcentage = []

resultpourcentage.push(
    { "book": somme_retiré},
    { "amount_def": amount_def },
    { "amount_win": amount_win}
)

for (var i = 0; i < participants_win.length; i++) {

    //converti en pourcentage de participation pour chaque personne gagnante
    const result_win_pourcentage = participants_win[ind].prix * 100 / amount_win

    //converti le pourcentage en somme gagné 
    const result_win = result_win_pourcentage * amount_def / 100

    //arrondi le resultat 2 chiffres après la virgule
    const conversion = Math.round(result_win * 100) / 100;

    //remets tout dans un forma json pour étre utilisé nimporte où
    resultpourcentage.push(
        {
            "name": participants_win[ind].name, 
            "misé": participants_win[ind].prix,
            "gagné": conversion
        }
    )
    ind++
}

console.log(resultpourcentage)