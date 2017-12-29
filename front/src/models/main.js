/**
 * Created by Lzzzzzq on 2017/12/28.
 */
import * as socket from "../services/socket";

let socketConnect = false;

export default {

    namespace: 'main',

    state: {
        err: false,
        msg: '',
        info: '',
        oppositeInfo: '',
        matchSuccess: false
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
                }
            })
        }
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
            return {
                ...state,
                err: false,
                msg: '',
                oppositeInfo: payload.payload.oppositeInfo,
                matchSuccess: true
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
        }
    }

}