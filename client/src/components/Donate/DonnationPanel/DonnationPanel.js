import React from 'react';
import styles from './DonnationPanel.module.css';
import {notify} from '../../Layout/Notifications/Notifications.js';
import LogoIcon from '../../LogoIcon/LogoIcon.js';
import { NotificationManager } from 'react-notifications';

class DonnationPanel extends React.Component {


    state = {
        amount: 0,
    }

    addCoins = () => {

        
        let newAmount = this.state.amount + 5;
        if(newAmount > 100) {
            newAmount = 100;
        }
        this.setState((prevState, props) => ({
            amount: newAmount,
        }))
    }

    subCoins = () => {

        let newAmount = this.state.amount - 5;
        if(newAmount < 0) {
            newAmount = 0;
        }
        this.setState((prevState, props) => (
            {
            amount: newAmount,
        }))
    }



    render() {
        return (
            <div className={styles.Wrapper}>
                    <div className={styles.donateTo}>Donating to: <span>{this.props.donationTo}</span></div>

                    <div className={styles.amountAdder}>
                        <div className={styles.selectAmount}>
                            <div className={styles.selectText}>Select Amount: {this.state.amount} </div>
                            <div><LogoIcon /></div>
                            
                        </div>

                        <div className={styles.btnAdderWrap}>
                            <button className={styles.more} onClick={this.addCoins}>more</button>
                            <button className={styles.less} onClick={this.subCoins}>less</button>
                        </div>
                    </div>

                <div><button className={styles.btn} onClick={() => {this.props.onSend(this.state.amount)}}>SEND!</button></div>
        </div>
        )

    }
}

export default DonnationPanel;