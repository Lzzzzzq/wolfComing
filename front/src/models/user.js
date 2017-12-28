/**
 * Created by Lzzzzzq on 2017/12/27.
 */
import * as service from "../services/user";

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
        setup({dispatch, history}) {
            history.listen(location => {
                if (location.pathname.includes('main')) {
                    console.log('main');
                } else if (location.pathname === '/') {
                    console.log('log');
                }
            });
        },
    },
    
    reducers: {
        loading(state, data){
            return {
                ...state,
                err: false,
                msg: '',
                loading: true
            }
        },
        logRes(state, data){
            if (data.payload.success) {
                return {
                    err: false,
                    msg: '',
                    loading: false,
                    info: data.payload.info,
                    login: true
                }
            } else {
                return {
                    err: true,
                    msg: data.payload.msg,
                    loading: false,
                    info: {},
                    login: false,
                }
            }
        }
    },

    effects: {
        *goLogin({payload}, {call, put}){
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
        }
    }
}
