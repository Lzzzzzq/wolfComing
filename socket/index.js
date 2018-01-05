let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let service = require('./socket');

let socketList = {};
let itemList = {};
let matchList = [];
let gameList = {};

io.on('connection', function (socket) { // 有新的连接
    console.log('a user connect');
    socketList[socket.id] = socket;

    socket.on('disconnect', function () { // 有连接断开
        console.log('a user disconnected');
        if (socketList[socket.id]) {
            try {
                // 从匹配队列中移除
                for (let i = 0; i < matchList.length; i++) {
                    if (matchList[i].name === socketList[socket.id].info.name) {
                        matchList.splice(i, 1);
                    }
                }
                // if (gameList[socketList[socket.id].info.name].with) {
                //     let leaveItemWithName = gameList[socketList[socket.id].info.name].with;
                //     // 删除对战列表中对方数据
                //     delete gameList[leaveItemWithName];
                //     // 删除对战列表中逃跑方数据
                //     delete gameList[socketList[socket.id].info.name].with;
                // }
                // 从玩家列表中移除
                delete itemList[socketList[socket.id].info.name];
                // 从socket列表中移除
                delete socketList[socket.id];
            } catch (err) {
                console.log(err);
            }
            console.log(socketList);
            console.log(itemList);
        }
    });

    try {

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
                        gameList = service.addGameList(gameList, playerA, playerB);
                        matchList.splice(matchIndex, 1);
                    } else { // 有可以匹配的玩家(阵营相同)
                        if (service.getRandom() >= 50) {
                            let playerA = data;
                            playerA.socket = socketList[itemList[data.name]];
                            playerA.camp = otherCamp;
                            let playerB = matchList[0];
                            playerB.socket = socketList[itemList[matchList[0].name]];
                            service.matchBoth(playerA, playerB);
                            gameList = service.addGameList(gameList, playerA, playerB);
                        } else {
                            let playerA = data;
                            playerA.socket = socketList[itemList[data.name]];
                            let playerB = matchList[0];
                            playerB.socket = socketList[itemList[matchList[0].name]];
                            playerB.camp = otherCamp;
                            service.matchBoth(playerA, playerB);
                            gameList = service.addGameList(gameList, playerA, playerB);
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
                        gameList = service.addGameList(gameList, playerA, playerB);
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
                            gameList = service.addGameList(gameList, playerA, playerB);
                        } else {
                            let playerA = data;
                            playerA.socket = socketList[itemList[data.name]];
                            playerA.camp = 'sheep';
                            let playerB = matchList[0];
                            playerB.socket = socketList[itemList[matchList[0].name]];
                            playerB.camp = 'wolf';
                            service.matchBoth(playerA, playerB);
                            gameList = service.addGameList(gameList, playerA, playerB);
                        }
                        matchList.shift();
                    }
                }
            }
        });

        socket.on('matchCancel', function (data) { // 取消匹配
            let name = data.name;
            let matchIndex = -1;
            for (let i = 0; i < matchList.length; i++) {
                if (matchList[i].name === name) {
                    matchIndex = i;
                }
            }
            if (matchIndex >= 0) {
                matchList.splice(matchIndex, 1);
            }
        });

        socket.on('getGameInfo', function (data) { // 获取游戏信息
            let name = data.name;
            console.log(gameList);
            console.log(name + ' get info');
            console.log(data);
            console.log(gameList[name]);
            if (gameList[name]) {
                console.log('send info to ' + name);
                socket.emit('gameInfo', gameList[name]);
                // socket.emit('gameInfo', gameList[name]);
            }
        })

        socket.on('createWolf', function (data) { // 生成狼
            console.log('createWolf: ');
            console.log(data.name);
            gameList[data.name].gameState = data;
            let withName = gameList[data.name].with;
            let withSocketId = itemList[withName];
            console.log(withName);
            console.log(withSocketId);
            socketList[withSocketId].emit('createWolf', data);
        })

        socket.on('chessMove', function (data) {
            console.log(data);
            let withName = data.with;
            let withSocketId = itemList[withName];
            let withSocket = socketList[withSocketId];
            console.log(withName);
            console.log(withSocketId);
            console.log(withSocket);
            gameList[withName].gameState = data.chessMoveData.reverse();
            withSocket.emit('chessMove', {
                camp: data.camp === 'wolf' ? 'sheep' : 'wolf',
                chessMoveData: data.chessMoveData.reverse(),
            })
        })
    } catch (err) {
        console.log(err);
    }

});

http.listen(3000, function () {
    console.log('listening on *:3000'); 
});