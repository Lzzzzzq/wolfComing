/**
 * Created by Lzzzzzq on 2018/1/2.
 */
import React, {Component} from "react";
import {connect} from "react-redux";
import Game from "../../components/Game/Game";

class GameWrap extends Component {
    componentDidMount() {
        console.log(this.props);
        let {dispatch, user} = this.props;
        dispatch({
            type: 'main/getGameInfo',
            payload: {
                name: user.info.name
            }
        })
    }

    gameInit() {
        let {user} = this.props;
    }

    render() {
        return (
            <div className="wrap">
                <Game/>
            </div>
        )
    }
}

let mapStateToProps = state => ({
    main: state.main,
    user: state.user
});

export default connect(mapStateToProps)(GameWrap);
