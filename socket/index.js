let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let service = require('./socket');

let socketList = {};
let itemList = {};
let matchList = [];

io.on('connection', function (socket) { // 有新的连接
    console.log('a user connect');
    socketList[socket.id] = socket;

    socket.on('disconnect', function () { // 有连接断开
        console.log('a user disconnected');
        if (socketList[socket.id]) {
            try {
                delete itemList[socketList[socket.id].info.name];
                delete socketList[socket.id];
            } catch (err) {
                console.log(err);
            }
            console.log(socketList);
            console.log(itemList);
        }
    });

    socket.on('setInfo', function (info) { // 设置info
        socketList[socket.id].info = info;
        itemList[info.name] = socket.id;
        console.log(socketList);
        console.log(itemList);
        socket.emit('setInfoSuccess', {
            state: 'success'
        });
    });

    socket.on('matchStart', function (data) { // 开始匹配
        let currentName = data.name;
        let currentCamp = data.camp;
        if (matchList.length === 0) { // 如果匹配队列中没有玩家
            matchList.push(data);
        } else { // 已经有玩家正在匹配队列
            if (currentCamp === 'wolf' || currentCamp === 'sheep') {
                let otherCamp = (currentCamp === 'wolf' ? 'sheep' : 'wolf');
                let matchIndex = -1;
                for (let i = 0; i < matchList.length; i++) {
                    if (matchList[i].camp === otherCamp || matchList[i].camp === 'random') {
                        matchIndex = i;
                        break;
                    }
                }

                if (matchIndex >= 0) { // 有可以匹配的玩家(阵营对立)
                    let playerA = data;
                    playerA.socket = socketList[itemList[data.name]];
                    let playerB = matchList[matchIndex];
                    playerB.socket = socketList[itemList[matchList[matchIndex].name]];
                    if (playerB.camp === 'random') {
                        if (playerA.camp === 'wolf') {
                            playerB.camp = 'sheep';
                        } else {
                            playerB.camp = 'wolf';
                        }
                    }
                    service.matchBoth(playerA, playerB);
                    matchList.splice(matchIndex, 1);
                } else { // 有可以匹配的玩家(阵营相同)
                    if (service.getRandom() >= 50) {
                        let playerA = data;
                        playerA.socket = socketList[itemList[data.name]];
                        playerA.camp = otherCamp;
                        let playerB = matchList[0];
                        playerB.socket = socketList[itemList[matchList[0].name]];
                        service.matchBoth(playerA, playerB);
                    } else {
                        let playerA = data;
                        playerA.socket = socketList[itemList[data.name]];
                        let playerB = matchList[0];
                        playerB.socket = socketList[itemList[matchList[0].name]];
                        playerB.camp = otherCamp;
                        service.matchBoth(playerA, playerB);
                    }
                    matchList.shift();
                }
            } else if (currentCamp === 'random') {
                let matchIndex = -1;
                for (let i = 0; i < matchList.length; i++) {
                    if (matchList[i].camp === 'wolf' || matchList[i].camp === 'sheep') {
                        matchIndex = i;
                        break;
                    }
                }
                if (matchIndex >= 0) { // 有可以匹配的玩家(阵营对立)
                    let playerA = data;
                    playerA.socket = socketList[itemList[data.name]];
                    let playerB = matchList[matchIndex];
                    playerA.camp = (playerB.camp === 'wolf' ? 'sheep' : 'wolf');
                    playerB.socket = socketList[itemList[matchList[matchIndex].name]];
                    service.matchBoth(playerA, playerB);
                    matchList.splice(matchIndex, 1);
                } else { // 有可以匹配的玩家(阵营相同)
                    if (service.getRandom() >= 50) {
                        let playerA = data;
                        playerA.socket = socketList[itemList[data.name]];
                        playerA.camp = 'wolf';
                        let playerB = matchList[0];
                        playerB.socket = socketList[itemList[matchList[0].name]];
                        playerA.camp = 'sheep';
                        service.matchBoth(playerA, playerB);
                    } else {
                        let playerA = data;
                        playerA.socket = socketList[itemList[data.name]];
                        playerA.camp = 'sheep';
                        let playerB = matchList[0];
                        playerB.socket = socketList[itemList[matchList[0].name]];
                        playerB.camp = 'wolf';
                        service.matchBoth(playerA, playerB);
                    }
                    matchList.shift();
                }
            }
        }
    })

});

http.listen(3000, function () {
    console.log('listening on *:3000');
});