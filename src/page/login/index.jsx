import React from 'react';

import UserService from 'service/user-service.jsx';
import MUtil from 'util/mm.jsx';

const _user = new UserService();
const _mm = new MUtil();

import './index.css';

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: _mm.getUrlParam('redirect') || '/',
        }
    }
    componentWillMount() {
        document.title = '登录 - MMALL ADMIN';
    }
    onInputChange(e) {
        let inputName = e.target.name,
            inputValue = e.target.value;
        this.setState({
            [inputName]: inputValue
        })
    }
    onInputKeyUp(e) {
        if(e.keyCode === 13) {
           this.onSubmit(e)
        }
    }
    //用户
    onSubmit(e) {
        let loginInfo = {
            username: this.state.username,
            password: this.state.password,
        };
        let checkResult = _user.checkLoginInfo(loginInfo);
        if(checkResult.status) {
            _user.login(loginInfo).then((res) => {
                // console.log(this.state.redirect);
                _mm.setStorage('userInfo', res);
                this.props.history.push(this.state.redirect)
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            })
        } else {
            _mm.errorTips(checkResult.msg);
        }

    }
    render() {
        return (
            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default login-panel">
                    <div className="panel-heading">欢迎登录系统</div>
                    <div className="panel-body">
                        <div>
                            <div className="form-group">
                                <input type="text"
                                       name="username"
                                       className="form-control"
                                       placeholder="Email"
                                       onKeyUp = {e => this.onInputKeyUp(e)}
                                       onChange={e => this.onInputChange(e)}
                                />
                            </div>
                            <div className="form-group">
                                <input type="password"
                                       name="password"
                                       className="form-control"
                                       placeholder="password"
                                       onKeyUp = {e => this.onInputKeyUp(e)}
                                       onChange={e => this.onInputChange(e)}
                                />
                            </div>
                            <button className="btn btn-primary btn-block" onClick={e => {this.onSubmit(e)}}
                            >灯笼鱼</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;