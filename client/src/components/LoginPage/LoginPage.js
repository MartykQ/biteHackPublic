import React from 'react';
import styles from './LoginPage.module.css'

class LoginPage extends React.Component {


    render() {

        return(
            <div>
                <button onClick={this.props.login_func} />
            </div>

        )
    }

}

export default LoginPage;