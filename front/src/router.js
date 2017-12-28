import React from "react";
import {Route, Router, Switch} from "dva/router";

import Layout from "./routes/Layout/Layout";
import LoginWrap from "./routes/Login/LoginWrap";
import MainWrap from "./routes/Main/MainWrap";


function RouterConfig({history}) {
    return (
        <Router history={history}>
            <Layout>
                <Route path="/" exact component={LoginWrap}/>
                <Route path="/main" component={MainWrap}/>
            </Layout>
        </Router>
    );
}

export default RouterConfig;
