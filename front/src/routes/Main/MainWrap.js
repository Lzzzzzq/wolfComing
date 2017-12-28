/**
 * Created by Lzzzzzq on 2017/12/28.
 */
import React, {Component} from "react";
import {connect} from "react-redux";

class MainWrap extends Component {
    render() {
        return (
            <div>main</div>
        )
    }
}

export default connect()(MainWrap);