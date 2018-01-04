let service = {
    matchBoth: function (A, B) {
        console.log(A);
        console.log(B);
        A.socket.emit('matchSuccess', {
            name: B.name,
            score: B.score,
            camp: B.camp
        });
        B.socket.emit('matchSuccess', {
            name: A.name,
            score: A.score,
            camp: A.camp
        });
    },
    getRandom: function () {
        return Math.round(Math.random(0, 1) * 100);
    },
    addGameList: function (list, A, B) {
        list[A.name] = A;
        list[B.name] = B;
        list[A.name].with = B.name;
        list[B.name].with = A.name;
        list[A.name].state = 0;
        list[B.name].state = 0;
        if (list[A.name].socket) {
            delete list[A.name].socket;
        }
        if (list[B.name].socket) {
            delete list[B.name].socket;
        }
        if (A.camp === 'wolf') {
            list[A.name].chessData = [
                [1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ];
            list[A.name].turn = true;
            list[B.name].chessData = [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1]
            ];
            list[B.name].turn = false;
        } else {
            list[A.name].chessData = [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1]
            ];
            list[A.name].turn = false;
            list[B.name].chessData = [
                [1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ];
            list[B.name].turn = true;
        }
        return list;
    }
};

module.exports = service;