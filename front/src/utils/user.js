/**
 * Created by Lzzzzzq on 2017/12/27.
 */

export function getParams(obj) {
    let resStr = "";
    let resArr = [];
    for (let item in obj) {
        let str = item + "=" + obj[item];
        resArr.push(str);
    }
    resStr += resArr.join("&");
    return resStr;
}

export function getRequest(url, data) {
    return new Request(url + '?' + data, {
        method: "POST",
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        headers: {'Content-Type': 'application/json; charset=UTF-8'},
        mode: "cors",
        // body: JSON.stringify(data),
        // body: data,
        // qs: data,
    });
}