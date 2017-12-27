/**
 * Created by Lzzzzzq on 2017/12/27.
 */
import fetch from "dva/fetch";
import * as user from "../utils/user";

export function login(username, password) {
    return new Promise((resolve, reject) => {
        let data = {
            username: username,
            password: password
        };
        let url = 'http://mock.cuidmm.cn/mock/5a41c260213a456a057bfb4e/game/';
        let parseData = user.getParams(data);
        let request = user.getRequest(url, parseData);
        fetch(request)
            .then(
                (res) => {
                    return res.json();
                }
            )
            .then(
                (data) => {
                    resolve(data);
                }
            )
            .catch(
                (err) => {
                    reject(err);
                }
            )
    })
}
