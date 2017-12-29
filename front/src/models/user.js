/**
 * Created by Lzzzzzq on 2017/12/27.
 */
import * as service from "../services/user";
import {routerRedux} from "dva/router";

let login = false;
let gameInfo = {};
if (sessionStorage.getItem('gameInfo')) {
    gameInfo = JSON.parse(sessionStorage.getItem('gameInfo'));
    if (gameInfo.login) {
        login = true;
    }
}

export default {
    namespace: 'user',

    state: {
        login: false,
        info: {},
        loading: false,
        err: false,
        msg: ''
    },

    subscriptions: {
        setup({dispatch, history}) { // 监听路由
            history.listen(location => {
                if (location.pathname !== '/') {
                    dispatch({
                        type: 'checkAuth',
                        payload: location.pathname
                    })
                }
                if (location.pathname.includes('main')) {
                    console.log('main');
                } else if (location.pathname === '/') {
                    console.log('log');
                    if (login) {
                        dispatch({
                            type: 'redirect'
                        })
                    }
                }
            });
        },
    },
    
    reducers: {
        loading(state, data){ // 等待
            return {
                ...state,
                err: false,
                msg: '',
                loading: true
            }
        },
        logRes(state, data){ // 登陆结果
            if (data.payload.success) {
                login = true;
                sessionStorage.setItem('gameInfo', JSON.stringify({
                    err: false,
                    msg: '',
                    loading: false,
                    info: data.payload.info,
                    login: true
                }));
                gameInfo = {
                    err: false,
                    msg: '',
                    loading: false,
                    info: data.payload.info,
                    login: true
                };
                return {
                    err: false,
                    msg: '',
                    loading: false,
                    info: data.payload.info,
                    login: true
                }
            } else {
                login = false;
                return {
                    err: true,
                    msg: data.payload.msg,
                    loading: false,
                    info: {},
                    login: false,
                }
            }
        },
        setInfo(state, data){ // 设置info
            return data.payload
        }
    },

    effects: {
        *goLogin({payload}, {call, put}){ // 登陆
            try {
                yield put({
                    type: 'loading'
                });
                let res = yield call(service.login, payload.username, payload.password);
                yield put({
                    type: 'logRes',
                    payload: res
                });
            } catch (err) {
                yield put({
                    type: 'logRes',
                    payload: {
                        success: false,
                        msg: '网络错误'
                    }
                });
            }
        },
        *checkAuth({payload}, {put}){ // 检查权限
            if (!login) {
                yield put(routerRedux.push('/'));
            } else {
                console.log(payload);
                console.log(gameInfo);
                // socket.setLocalInfo(gameInfo);
                // yield call(socket.setInfo, gameInfo);
                yield put({
                    type: 'setInfo',
                    payload: gameInfo
                });
            }
        },
        *redirect({payload}, {put}){ // 重定向
            yield put(routerRedux.push('/main'));
        }
    }
}
