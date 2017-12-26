/**
 * Created by Lzzzzzq on 2017/12/26.
 */
import React, {Component} from "react";
import styles from "./Layout.less";

export default class Layout extends Component {
    render() {
        return (
            <div className={styles.layoutWrap}>
                <div className={styles.shadowTop}></div>
                <div className={styles.shadowBot}></div>
                {this.props.children}
            </div>
        )
    }
}
