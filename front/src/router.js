import React from "react";
import {Route, Router, Switch} from "dva/router";

import Layout from "./routes/Layout/Layout";
import LoginWrap from "./routes/Login/LoginWrap";
import MainWrap from "./routes/Main/MainWrap";
import gameWrap from "./routes/Game/GameWrap";


function RouterConfig({history}) {
    return (
        <Router history={history}>
            <Layout>
                <Route path="/" exact component={LoginWrap}/>
                <Route path="/main" component={MainWrap}/>
                <Route path="/game" component={gameWrap}/>
            </Layout>
        </Router>
    );
}

export default RouterConfig;
