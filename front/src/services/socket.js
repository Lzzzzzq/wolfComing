/**
 * Created by Lzzzzzq on 2017/12/29.
 */
import io from "socket.io-client";

let socket = false;
let gameInfo = {};

export function socketListen(action) { // socket监听
    if (!socket) {
        socket = io("10.10.4.20:3000");
        action({
            type: 'connect',
            state: 'success'
        });
    }
    socket.on('matchSuccess', function (data) {
        console.log(data);
        action({
            type: 'matchSuccess',
            oppositeInfo: data
        });
    })
}

export function setInfo(data) { // 向socket发送设置info
    return new Promise((resolve, reject) => {
        console.log(data);
        socket.emit('setInfo', data.info);

        socket.on('setInfoSuccess', function () {
            resolve();
        });
    })
}

export function matchStart(data) { // 开始匹配
    return new Promise((resolve, reject) => {
        console.log(data);
        socket.emit('matchStart', data);
        resolve();
    })
}

export function matchCancel(data) { // 取消匹配
    return new Promise((resolve, reject) => {
        socket.emit('matchCancel', data);
        resolve();
    })
}

export function setLocalInfo(data) {
    gameInfo = data;
}

export function getGameInfo(data) {
    return new Promise((resolve, reject) => {
        socket.emit('getGameInfo', data);
        resolve();
    })
}
