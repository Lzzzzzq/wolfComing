/**
 * Created by Lzzzzzq on 2017/12/28.
 */
import React, {Component} from "react";
import {Drawer, Icon, List, NavBar} from "antd-mobile";
import {connect} from "react-redux";
import Main from "../../components/Main/Main";

class MainWrap extends Component {

    state = {
        main: {}
    };

    componentDidMount() {
        console.log(this.props);
        let {user, main, dispatch} = this.props;
        if (user.login && main.info === '') {
            dispatch({
                type: 'main/setInfo',
                payload: {
                    info: user.info
                }
            });
            dispatch({
                type: 'main/setSocketInfo',
                payload: {
                    info: user.info
                }
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            main: nextProps.main
        })
    }

    startMatch(camp) {
        console.log(camp);
        let {dispatch, main} = this.props;
        dispatch({
            type: 'main/startMatch',
            payload: {
                camp: camp,
                name: main.info.name,
                score: main.info.score
            }
        })
    }

    render() {
        return (
            <div className="wrap">
                <Main
                    startMatch={this.startMatch.bind(this)}
                    main={this.state.main}
                />
            </div>
        )
    }
}

let mapStateToProps = state => ({
    user: state.user,
    main: state.main
});

export default connect(mapStateToProps)(MainWrap);