import dva from "dva";
import {createLogger} from "redux-logger";
import {browserHistory} from "dva/router";
import "./index.css";

// 1. Initialize
const app = dva({
    onAction: createLogger(),
    history: browserHistory,
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/user'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
