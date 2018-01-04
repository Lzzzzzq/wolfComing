/**
 * Created by Lzzzzzq on 2018/1/2.
 */
import React, {Component} from "react";
import {Button, Grid} from "antd-mobile";
import classnames from "classnames";
import styles from "./Game.less";

// let init = false;
// let wolfIndex = [];
const logo = {
    wolf: 'http://ohaw6xm8w.bkt.clouddn.com/wolfnew.png',
    sheep: 'http://ohaw6xm8w.bkt.clouddn.com/sheepnew.png'
};

export default class Game extends Component {
    state = {
        camp: '',
        chessData: [
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0],
            [0, 2, 2, 2, 0]
        ],
        init: false,
        chessMoveData: [],
        turnBoxShow: false,
        wolfIndex: []
    };

    componentDidMount() {
        // let camp = 'wolf';
        // this.formatChessData(camp);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.gameInfo.name) {
            console.log(nextProps.gameInfo);
            let {camp, chessData, state, turn} = nextProps.gameInfo;
            this.formatChessData(camp, chessData, state, turn);
            if (nextProps.gameInfo.gameState) {
                if (nextProps.gameInfo.state === 0 && nextProps.gameInfo.camp === 'sheep' && nextProps.gameInfo.gameState.camp === 'wolf') {
                    let wolfIndex = nextProps.gameInfo.gameState.wolfIndex;
                    let createWolfPos = [];
                    for (let i = 0; i < wolfIndex.length; i++) {
                        createWolfPos.push({
                            camp: 'wolf',
                            index: 24 - wolfIndex[i],
                            pos: {
                                x: (24 - wolfIndex[i]) % 5,
                                y: parseInt((24 - wolfIndex[i]) / 5)
                            }
                        })
                    }
                    this.updateChess(createWolfPos);
                }
            }
        }
    }

    formatChessData(camp, chess, state, turn) {
        let arr = [];
        let chessData = chess;
        for (let i = 0; i < chessData.length; i++) {
            for (let n = 0; n < chessData[i].length; n++) {
                if (chessData[i][n] === 1) {
                    arr.push({
                        icon: 'http://ohaw6xm8w.bkt.clouddn.com/sheepnew.png',
                        type: 'sheep',
                        pos: {
                            x: n,
                            y: i
                        }
                    });
                } else if (chessData[i][n] === 2) {
                    arr.push({
                        icon: 'http://ohaw6xm8w.bkt.clouddn.com/wolfnew.png',
                        type: 'wolf',
                        pos: {
                            x: n,
                            y: i
                        }
                    });
                } else {
                    arr.push({
                        type: 'space',
                        pos: {
                            x: n,
                            y: i
                        }
                    });
                }
            }
        }
        this.setState({
            chessMoveData: arr,
            chessData: chess,
            camp: camp,
            state: state,
            turn: turn,
            turnBoxShow: true
        });
    }

    updateChess(arr, wolfIndex) { // 更新棋盘
        var chessRes = this.state.chessMoveData;
        for (let i = 0; i < arr.length; i++) {
            chessRes[arr[i].index].type = arr[i].camp;
            if (chessRes[arr[i].index].type !== 'space') {
                chessRes[arr[i].index].icon = logo[arr[i].camp];
            } else {
                if (chessRes[arr[i].index].icon) {
                    delete chessRes[arr[i].index].icon;
                }
            }
            chessRes[arr[i].index].pos = arr[i].pos;
        }
        if (wolfIndex) {
            this.setState({
                chessMoveData: chessRes,
                wolfIndex: wolfIndex
            })
        } else {
            this.setState({
                chessMoveData: chessRes
            })
        }
    }

    addWolf(index) { // 添加狼
        let wolfIndex = this.state.wolfIndex;
        if (wolfIndex.length < 3) {
            wolfIndex.push(index);
            this.updateChess([
                {
                    index: index,
                    camp: 'wolf',
                    pos: {
                        x: index % 5,
                        y: parseInt(index / 5)
                    }
                }
            ], wolfIndex);
        }
    }

    removeWolf(index) { // 移除狼
        let wolfIndex = this.state.wolfIndex;
        if (wolfIndex.indexOf(index) >= 0) {
            wolfIndex.splice(wolfIndex.indexOf(index), 1);
            this.updateChess([
                {
                    index: index,
                    camp: 'space',
                    pos: {
                        x: index % 5,
                        y: parseInt(index / 5)
                    }
                }
            ], wolfIndex);
        }
    }

    createWolf() { // 生成狼
        // init = true;
        this.props.createWolf(this.state);
        this.setState({
            init: true,
            wolfIndex: []
        })
    }

    handleClick(ele, index) { // 界面被点击
        if (!this.state.turn) return;

        if (this.state.camp === 'wolf' && !this.state.init) {
            if (ele.type === 'space') { // 如果点击了空地
                if (this.state.wolfIndex.length < 3) {
                    console.log('add wolf');
                    this.addWolf(index);
                }
            } else if (ele.type === 'wolf') {
                this.removeWolf(index);
            }
        }

        console.log(ele, index);
    }

    render() {
        let data = this.state.chessMoveData;
        return (
            <div className="wrap">
                <div className={styles.chessBoardWrap}>
                    <Grid
                        data={data}
                        activeStyle={false}
                        columnNum={5}
                        // onClick={(ele, index) => {
                        //     console.log(ele, index);
                        //     this.handleClick.bind(this, ele, index);
                        // }}
                        onClick={this.handleClick.bind(this)}
                        renderItem={
                            dataItem => (
                                <div style={{
                                    width: '100%',
                                    height: '100%'
                                }}>
                                    {
                                        dataItem.icon ?
                                            <img src={dataItem.icon}
                                                 style={{width: '70%', height: '70%', margin: '15%'}} alt=""/> : ''
                                    }
                                </div>
                            )
                        }
                    />
                </div>
                {this.state.wolfIndex.length < 3 ? '' :
                    <Button
                        className={styles.createWolf}
                        type="primary"
                        size="small"
                        onClick={this.createWolf.bind(this)}
                    >生成狼</Button>}
                <div
                    className={
                        classnames({
                            [styles.gameTurnWrap]: true,
                            [styles.gameMyTurn]: this.state.turn,
                            [styles.gameOtherTurn]: !this.state.turn,
                            [styles.gameWolfInit]: !this.state.init && this.state.camp === 'wolf',
                        })
                    }
                    style={{
                        'display': this.state.turnBoxShow ? 'block' : 'none'
                    }}
                >
                    {!this.state.init && this.state.camp === 'wolf' ? '请选择位置放置三只狼' : (this.state.turn ? '己方回合' : '对方回合')}
                </div>
            </div>
        )
    }
}