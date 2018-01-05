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

    chessMove(data, camp) {
        console.log(data);
        let {dispatch, main, user} = this.props;
        console.log(main);
        console.log(user);
        dispatch({
            type: 'main/chessMove',
            payload: {
                chessMoveData: data,
                name: main.info.name,
                camp: camp,
                with: main.oppositeInfo.name
            }
        })
    }

    render() {
        return (
            <div className="wrap">
                <Game
                    gameInfo={this.state.gameInfo}
                    createWolf={this.createWolf.bind(this)}
                    chessMove={this.chessMove.bind(this)}
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
