let service = {
    matchBoth: function (playerA, playerB) {
        console.log(playerA);
        console.log(playerB);
        playerA.socket.emit('matchSuccess', {
            name: playerB.name,
            score: playerB.score,
            camp: playerB.camp
        });
        playerB.socket.emit('matchSuccess', {
            name: playerA.name,
            score: playerA.score,
            camp: playerA.camp
        });
    },
    getRandom: function () {
        return Math.round(Math.random(0, 1) * 100);
    }
};

module.exports = service;