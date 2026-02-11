const inicioCard = new Date("2025-09-11T00:00:00");
const agoraCard = new Date();
const diffDias = Math.floor((agoraCard - inicioCard) / (1000 * 60 * 60 * 24));
const elementoCard = document.getElementById("tempoCard");

if(elementoCard) {
    elementoCard.innerText = `${diffDias} dias de nós`;
}