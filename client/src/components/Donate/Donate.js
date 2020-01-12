import React from 'react';
import styles from './Donate.module.css';
import Modal from '../Layout/Modal/Modal.js';
import DonnationPanel from './DonnationPanel/DonnationPanel.js';
import axios from '../../axios-main.js';


import { NotificationManager } from 'react-notifications';

class Donate extends React.Component {

    state = {
        users: [{nickname: 'asd'}],
        modal_show: false,
        public_id: "",
        amount: 0,
        nameDonator: "",
    }

    componentDidMount() {
        this.fetchData()
    }

    closeModal = () => {
        this.setState({
            modal_show: false,
        })
    }

    startDonation = (name, public_id) => {
        this.setState({
            nameDonator: name,
            modal_show: true,
            public_id,
        })
    }

    fetchData = () => {
        console.log('fin', this.props.token)
        axios.get('all_user', {
            headers: {
                'x-access-token': this.props.token
            }
        }).then(res => {
            console.log(res.data)
            this.setState({
                users: res.data['users']
            })
        })

    }
    
    sendDonation = (amount) => {
        console.log(amount);
        console.log(this.state.public_id);

        axios.post('donate', {
            "public_id": this.state.public_id,
            "kwota": amount
        }, {
            headers: {
                'x-access-token': this.props.token
            }
        }).then(res => {
            console.log(res.data)
            NotificationManager.success(res.data['message'], 'INFO', 1300);
            this.closeModal();
        }).catch(res => {
            NotificationManager.error(res.data['message'], 'Error!', 1300);
            this.closeModal();
        })


    }

    render() {
        let iter = 0;
        let ranking = this.state.users.map(usr => {
            iter++;
            return (
                <a onClick={() => {this.startDonation(usr.name, usr.public_id)}}><div className={styles.Record}><div>{iter}. {usr.name} {usr.surname} {usr.role}</div></div></a>
            )
        })

        return (
        <div className={styles.Wrapper}>       
            <Modal show={this.state.modal_show} modalClosed={this.closeModal}>
                <DonnationPanel donationTo={this.state.nameDonator} onSend={this.sendDonation}/>
            </Modal>
            <div className={styles.tloDonate}>{ranking}</div>
        </div>
        )
    }

}

export default Donate;