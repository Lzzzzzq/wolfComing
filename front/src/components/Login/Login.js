/**
 * Created by Lzzzzzq on 2017/12/26.
 */
import React, {Component} from "react";
import classnames from "classnames";
import styles from "./Login.less";
import wolf from "../../assets/wolf.png";
import username from "../../assets/people.png";
import password from "../../assets/lock.png";
import logo from "../../assets/react.png";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    componentDidMount() {
        console.log('change');
    }

    usernameChange(e) { // 输入用户名
        let username = e.target.value;
        this.setState({
            username: username
        });
    }

    passwordChange(e) { // 输入密码
        let password = e.target.value;
        this.setState({
            password: password
        });
    }

    handleLogIn() { // 登录被点击
        this.props.logIn(this.state.username, this.state.password);
    }

    handlePress(e) {
        if (e.which === 13) {
            this.props.logIn(this.state.username, this.state.password);
        }
    }
    render() {
        return (
            <div className={styles.inputOutWrap}>
                <div className={styles.inputWrapLogoBox}>
                    <img src={wolf} className={styles.inputWrapLogo} alt=""/>
                    <div className={styles.inputWrapLogoText}>
                        {/*Wolf Coming*/}
                    </div>
                </div>
                <div className={styles.inputWrap}>
                    <img src={logo} className={styles.inputLogo} alt=""/>
                    <div className={
                        classnames({
                            [styles.inputItemWrap]: true,
                            [styles.inputUsername]: true
                        })
                    }>
                        <img src={username} className={styles.inputItemLogo} alt=""/>
                        <input
                            type="text"
                            className={styles.inputItem}
                            onChange={this.usernameChange.bind(this)}
                            onClick={(e) => {
                                e.target.focus()
                            }}
                            onKeyPress={this.handlePress.bind(this)}
                        />
                    </div>
                    <div className={
                        classnames({
                            [styles.inputItemWrap]: true,
                            [styles.inputPassword]: true
                        })
                    }>
                        <img src={password} className={styles.inputItemLogo} alt=""/>
                        <input
                            type="password"
                            className={styles.inputItem}
                            onChange={this.passwordChange.bind(this)}
                            onClick={(e) => {
                                e.target.focus()
                            }}
                            onKeyPress={this.handlePress.bind(this)}
                        />
                    </div>
                    <div
                        className={styles.inputSignIn}
                        onClick={this.handleLogIn.bind(this)}
                    >Sign In
                    </div>
                </div>
                {/*<div className={styles.inputSignUp}>Sign Up</div>*/}
                <div className={styles.wrapUnder}></div>
            </div>
        )
    }
}