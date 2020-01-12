import React from 'react';
import styles from './Register.module.css';
import axios from '../../axios-main.js';
import { NotificationManager } from 'react-notifications';
import { NavLink } from 'react-router-dom';


class Register extends React.Component {

    state = {
        name: "",
        surname: "",
        email: "",
        password: "",
        role: "",
    }

    sendRegister = () => {
        axios.post('user', {
            'name': this.state.name,
            'surname': this.state.name,
            'role': this.state.role,
            'password': this.state.password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            NotificationManager.success(res.data['message'], 'INFO', 1300);
        })
    }

    handleChange = input => e => {
        console.log(input);
        this.setState({
            [input]: String(e.target.value),
        })
    }

    render() {

        return(
            <div className={styles.box} onSubmit={(e) => {e.preventDefault()}}>
                <form>
                    <input type="text" name="" placeholder="Name" onChange={this.handleChange('name')}></input>
                    <input type="text" name="" placeholder="Surname" onChange={this.handleChange('surname')}></input>
                    <input type="text" name="" placeholder="Role" onChange={this.handleChange('role')}></input>
                    <input type="text" name="" placeholder="Email"  onChange={this.handleChange('email')}></input>
                    <input type="password" name="" placeholder="Password" onChange={this.handleChange('password')}></input>
                    <button onClick={this.sendRegister}>Register!</button>
                    <div>{this.state.password}</div>
                </form>

                <NavLink to="/">Home</NavLink>
            </div>


        )


    }
}

export default Register;