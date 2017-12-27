/**
 * Created by Lzzzzzq on 2017/12/26.
 */
import React, {Component} from "react";
import {Button, Toast, WhiteSpace, WingBlank} from "antd-mobile";
import {connect} from "react-redux";
import Login from "../../components/Login/Login";

class LoginWrap extends Component {
    constructor(props) {
        super();
        this.state = {};
    }

    componentWillReceiveProps(nextProps) {
        let user = nextProps.user;
        if (user.loading) {
            Toast.loading('正在登录', 30);
        } else {
            Toast.hide();
        }
        if (user.login) {
            Toast.success('登录成功', 2);
        }
        if (user.err) {
            Toast.fail(user.msg, 2);
        }
    }

    logIn(username, password) { // 登录
        if (username === '') {
            Toast.fail('请输入用户名', 1);
        } else if (password === '') {
            Toast.fail('请输入密码', 1);
        } else if (username.indexOf(' ') >= 0) {
            Toast.fail('含有非法字符', 1);
        } else {
            let dispatch = this.props.dispatch;
            dispatch({
                type: 'user/goLogin',
                payload: {
                    username: username,
                    password: password
                }
            })
        }
    }

    componentDidMount() {
        this.setState(this.props.user);
    }
    render() {
        return (
            <div className="wrap">
                <Login logIn={this.logIn.bind(this)}/>
            </div>
        )
    }
}

let mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(LoginWrap);
