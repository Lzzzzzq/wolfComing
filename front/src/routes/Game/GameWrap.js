/**
 * Created by Lzzzzzq on 2018/1/2.
 */
import React, {Component} from "react";
import {connect} from "react-redux";
import Game from "../../components/Game/Game";

class GameWrap extends Component {
    state = {
        gameInfo: {}
    };
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

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        let {user, main} = nextProps;
        if (main.gameInfo.name) {
            this.setState({
                gameInfo: main.gameInfo
            })
        }
    }

    gameInit() {
        let {user} = this.props;
    }

    createWolf(gameState) {
        let {user, dispatch} = this.props;
        gameState.name = user.info.name;
        console.log(gameState);
        dispatch({
            type: 'main/createWolf',
            payload: gameState
        })
    }

    render() {
        return (
            <div className="wrap">
                <Game
                    gameInfo={this.state.gameInfo}
                    createWolf={this.createWolf.bind(this)}
                />
            </div>
        )
    }
}

let mapStateToProps = state => ({
    main: state.main,
    user: state.user
});

export default connect(mapStateToProps)(GameWrap);
