/**
 * Created by Lzzzzzq on 2017/12/28.
 */
import {routerRedux} from "dva/router";
import * as socket from "../services/socket";

let socketConnect = false;
let gameState = false;

export default {

    namespace: 'main',

    state: {
        err: false,
        msg: '',
        info: '',
        oppositeInfo: '',
        matchSuccess: false,
        gameInfo: {}
    },

    subscriptions: {
        socket({dispatch}){ // socket相关
            return socket.socketListen(data => {
                console.log(data);
                switch (data.type) {
                    case 'connect':
                        if (data.state === 'success') {
                            dispatch({
                                type: 'connectSuccess'
                            })
                        } else {
                            dispatch({
                                type: 'connectFail'
                            })
                        }
                        break;
                    case 'matchSuccess':
                        dispatch({
                            type: 'matchSuccess',
                            payload: data
                        });
                    case 'gameInfo':
                        console.log(data);
                        dispatch({
                            type: 'setGameInfo',
                            payload: data
                        })
                }
            })
        },
        setup({dispatch, history}) { // 监听路由
            history.listen(location => {
                if (location.pathname === '/game') {
                    dispatch({
                        type: 'checkGameState'
                    })
                }
            });
        },
    },

    reducers: {
        connectFail(state){ // socket连接失败
            console.log('connect fail ...');
            socketConnect = true;
            return {
                ...state,
                err: true,
                msg: '服务器连接失败'
            }
        },
        connectSuccess(state){ // socket连接成功
            console.log('connect success ...');
            socketConnect = false;
            return {
                ...state,
                err: false,
                msg: ''
            }
        },
        setInfo(state, payload){ // 设置info
            return {
                ...state,
                info: payload.payload.info
            }
        },
        matchSuccess(state, payload){
            gameState = true;
            return {
                ...state,
                err: false,
                msg: '',
                oppositeInfo: payload.payload.oppositeInfo,
                matchSuccess: true
            }
        },
        setGameInfo(state, payload){
            // todo 设置游戏信息
            return {
                ...state,
                gameInfo: payload.payload.gameInfo
            }
        }
    },

    effects: {
        *setSocketInfo({payload}, {call, put}){ // 向socket服务器发送设置info
            yield call(socket.setInfo, payload);
        },
        *startMatch({payload}, {call, put}){ // 开始匹配
            console.log(payload);
            yield call(socket.matchStart, payload);
        },
        *matchCancel({payload}, {call, put}){ // 取消匹配
            console.log('match cancel');
            yield call(socket.matchCancel, payload);
        },
        *goGame({payload}, {put}){ // 重定向
            yield put(routerRedux.push('/game'));
        },
        *checkGameState({payload}, {put}){
            // if(!gameState){
            //     yield put(routerRedux.push('/main'));
            // }
        },
        *getGameInfo({payload}, {call, put}){
            yield call(socket.getGameInfo, payload);
        }
    }

}