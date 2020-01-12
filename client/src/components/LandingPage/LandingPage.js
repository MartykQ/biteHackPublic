import React from 'react';
import auth from '../../auth'
import LoginPage from '../LoginPage/LoginPage';
import styles from './LandingPage.module.css'
import axios from '../../axios-main'
import {NavLink} from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import Logo from '../Logo/Logo.js';


class LandingPage extends React.Component {

    state = {
        login: "",
        password: "",
    }

    handleChange = input => e => {
        this.setState({
            [input]: String(e.target.value),
        })
    }
    render() {
        return (
            <div>
                <form onSubmit={(e) => {e.preventDefault()}} className={styles.box}>
                    <h1>SUPPY</h1>
                    <Logo />
                    <input type="text" name="" placeholder="Username" onChange={this.handleChange('login')}></input>
                    <input type="password" name="" placeholder="Password" onChange={this.handleChange('password')}></input>
                    <button type="submit" onClick={() => {
                                                axios.get('login', {
                                                    auth: {
                                                        username: this.state.login,
                                                        password: this.state.password
                                                    }
                                                }).then(res => {
                                                    console.log(res.data)
                                                    if(res.data['token']) {
                                                        this.props.onLogin(res.data['token']);
                                                            
                                                        auth.login(() => {
                                                            this.props.history.push('/app')
                                                        })
                            
                                                    } else {
                                                        console.log("AUTH ERROR")
                                                    }
                                                    
                                                }).catch(res => {
                                                });

                                            }
                    } > LOGIN </button>
                <NavLink className={styles.navReg} to='/register'>Create account</NavLink>
                </form>

                


            
            </div>
        )
    }

}

export default LandingPage;

