/**
 * Created by Lzzzzzq on 2018/1/2.
 */
import React, {Component} from "react";
import {Grid} from "antd-mobile";
import styles from "./Game.less";

let init = false;

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
        chessMoveData: []
    };

    componentDidMount() {
        let camp = 'wolf';
        this.formatChessData(camp);
    }

    formatChessData(camp) {
        let arr = [];
        let chessData = this.state.chessData;
        if (!this.state.init) {
            if (camp === 'wolf') {
                chessData = [
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [0, 0, 0, 0, 0],
                    [0, 2, 2, 2, 0]
                ];
            } else {
                chessData = [
                    [0, 2, 2, 2, 0],
                    [0, 0, 0, 0, 0],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1]
                ];
            }
        }
        for (let i = 0; i < chessData.length; i++) {
            for (let n = 0; n < chessData[i].length; n++) {
                if (chessData[i][n] === 1) {
                    arr.push({
                        icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                        type: 'sheep',
                        pos: {
                            x: n,
                            y: i
                        }
                    });
                } else if (chessData[i][n] === 2) {
                    arr.push({
                        icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
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
            chessMoveData: arr
        });
        return arr;
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
                        onClick={(ele, index) => {
                            console.log(ele, index);
                        }}
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
            </div>
        )
    }
}