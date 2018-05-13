import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';

//页面
import Home from 'page/home/index.jsx';
import ProductRouter from 'page/product/router.jsx';
import Login from 'page/login/index.jsx';
import Layout from 'component/layout/index.jsx';
import Error from 'page/error/index.jsx';
import UserList from 'page/user/index.jsx';

class App extends React.Component {

    render() {
        let layoutRouter = (
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/product" component={ProductRouter} />
                    <Route path="/product-category" component={ProductRouter} />
                    <Route path="/user/index" component={UserList} />
                    <Redirect exact from="/user" to="/user/index" />
                    <Route component={Error}></Route>
                </Switch>
            </Layout>
        );
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/" render={props => layoutRouter}/>
                </Switch>

            </Router>
        )
    }
}
ReactDOM.render(
    <App/>,
    document.getElementById('app')
);
