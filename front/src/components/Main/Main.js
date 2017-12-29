/**
 * Created by Lzzzzzq on 2017/12/29.
 */
import React, {Component} from "react";
import {Button, Icon, Modal, WhiteSpace, WingBlank} from "antd-mobile";
import classnames from "classnames";
import styles from "./Main.less";
import wolf from "../../assets/wolf.png";

const alert = Modal.alert;

export default class Main extends Component {
    state = {
        matchLoading: false,
        matchOpposite: false,
        time: 0,
        oppositeInfo: {}
    };

    chooseCamp(camp) { // 选择阵营
        this.props.startMatch(camp);
        this.setState({
            matchLoading: true
        })
    };

    matchCancel() { // 取消匹配
        this.setState({
            matchLoading: false
        });
    };

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        let {main} = nextProps;
        this.setState({
            time: 5
        });
        if (main.matchSuccess && this.state.matchLoading) {
            this.setState({
                matchLoading: false,
                matchOpposite: true,
                oppositeInfo: main.oppositeInfo
            });
            let timer = setInterval(() => {
                if (this.state.time > 1) {
                    this.setState({
                        time: this.state.time - 1
                    })
                } else {
                    clearInterval(timer);
                    this.setState({
                        matchOpposite: false
                    })
                }
            }, 1000);
        }
    }

    render() {
        return (
            <div className="wrap">
                <div className={styles.operationWrap}>
                    <WingBlank size="lg">
                        <WhiteSpace size="lg"/>
                        <Button type="primary" onClick={() => alert('准备阶段', <div>请选择你要玩的阵营</div>, [
                            {text: '我要玩狼', onPress: this.chooseCamp.bind(this, 'wolf')},
                            {text: '我要玩羊', onPress: this.chooseCamp.bind(this, 'sheep')},
                            {text: '随意，我贼溜', onPress: this.chooseCamp.bind(this, 'random')},
                            {text: '妈耶，点错了', onPress: () => console.log('cancel')},
                        ])}
                        >匹配玩家</Button>
                        <WhiteSpace size="lg"/>
                    </WingBlank>
                    <WingBlank size="lg">
                        <Button type="primary" disabled>人机对战（暂未开放）</Button>
                    </WingBlank>
                    <Modal
                        visible={this.state.matchLoading}
                        transparent
                        maskClosable={false}
                        title="正在匹配对手"
                        footer={[{text: '取消匹配', onPress: this.matchCancel.bind(this)}]}
                    >
                        <div style={{height: 80, overflow: 'hidden', lineHeight: '100px'}}>
                            <Icon type="loading" size={'lg'}/>
                        </div>
                    </Modal>
                    <Modal
                        visible={this.state.matchOpposite}
                        transparent
                        maskClosable={false}
                        title="匹配成功"
                        footer={[{text: this.state.time + ' 秒后开始'}]}
                    >
                        <div className="clearfix" style={{height: 90, overflow: 'hidden', lineHeight: '100px'}}>
                            <div className={styles.oppositeAvatar}>
                                <img src={wolf} alt=""/>
                            </div>
                            <div className={styles.oppositeInfoWrap}>
                                <div className={
                                    classnames({
                                        [styles.oppositeInfoItem]: true,
                                        'clearfix': true,
                                    })
                                }>
                                    <div className={styles.oppositeInfoItemText}>昵称：</div>
                                    <div className={styles.oppositeInfoItemValue}>{this.state.oppositeInfo.name}</div>
                                </div>
                                <div className={
                                    classnames({
                                        [styles.oppositeInfoItem]: true,
                                        'clearfix': true,
                                    })
                                }>
                                    <div className={styles.oppositeInfoItemText}>分数：</div>
                                    <div className={styles.oppositeInfoItemValue}>{this.state.oppositeInfo.score}</div>
                                </div>
                                <div className={
                                    classnames({
                                        [styles.oppositeInfoItem]: true,
                                        'clearfix': true,
                                    })
                                }>
                                    <div className={styles.oppositeInfoItemText}>阵营：</div>
                                    <div
                                        className={styles.oppositeInfoItemValue}>{this.state.oppositeInfo.camp === 'wolf' ? '狼' : '羊'}</div>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        )
    }
}