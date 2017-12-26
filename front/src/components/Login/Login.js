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
    render() {
        return (
            <div className={styles.inputOutWrap}>
                <div className={styles.inputWrapLogoBox}>
                    <img src={logo} className={styles.inputWrapLogo} alt=""/>
                    <div className={styles.inputWrapLogoText}>
                        Wolf Coming
                    </div>
                </div>
                <div className={styles.inputWrap}>
                    <img src={wolf} className={styles.inputLogo} alt=""/>
                    <div className={
                        classnames({
                            [styles.inputItemWrap]: true,
                            [styles.inputUsername]: true
                        })
                    }>
                        <img src={username} className={styles.inputItemLogo} alt=""/>
                        <input type="text" className={styles.inputItem}/>
                    </div>
                    <div className={
                        classnames({
                            [styles.inputItemWrap]: true,
                            [styles.inputPassword]: true
                        })
                    }>
                        <img src={password} className={styles.inputItemLogo} alt=""/>
                        <input type="password" className={styles.inputItem}/>
                    </div>
                    <div className={styles.inputSignIn}>Sign In</div>
                </div>
                <div className={styles.inputSignUp}>Sign Up</div>
                <div className={styles.wrapUnder}></div>
            </div>
        )
    }
}