import React from 'react';
import styles from './UserProfile.module.css';
import avatar from '../../images/avatar.png'
import {notify} from '../Layout/Notifications/Notifications.js';
import axios from '../../axios-main';
import LogoIcon from '../LogoIcon/LogoIcon.js';

class UserProfile extends React.Component {

    state = {
        user: {
            name: "Franek",
            surname: "Martyka",
            wallet: 100,
            points: 240,
            nickname: "100pa",
            role: "Software Developer",
            placement: "1"
        },
        
    }

    componentDidMount() {
        console.log("CompDidMount")
        this.fetchInfo();
        notify("huj")

    }


    fetchInfo = () => {
        console.log('AASD', this.props.token)
        axios.get('user_info', {
            headers: {
                'x-access-token': String(this.props.token)
            }
        }).then(res => {
            console.log(res.data)
            this.setState({
                user: {
                    name: res.data['name'],
                    surname: res.data['surname'],
                    wallet: res.data['wallet'],
                    points: res.data['points'],
                    nickname: res.data['nickname'],
                    placement: String(res.data['placement'])
                }
                
            })
        })
    }

    render() {
        return(
            <div className={styles.Wrapper}>

                <div className={styles.InfoTop}>
                    <div className={styles.Avatar}><img className={styles.AvatarImg} src={avatar} alt="logo" /></div>
                    <div className={styles.UserNameInfo}>
                        <div className={styles.Name}>{this.state.user.name}</div>
                        <div className={styles.Surname}>{this.state.user.surname}</div>
                    </div>
                    <div className={styles.NickName}>{this.state.user.nickname}</div>
                    
                </div>


                <div className={styles.InfoBottom}>

                <div className={styles.LaderBut}><div>Standing: {this.state.user.placement}</div></div>
                    <div className={styles.BottomDesc}>
                        <div>Your wallet</div>
                        <div className={styles.amountLogo}><div>SUPPS</div><LogoIcon /></div>
                    </div>
                    <div className={styles.BottomValue}>
                        <div>{this.state.user.wallet}</div>
                        <div>{this.state.user.points}</div>            
                    </div>
                </div>

            </div>
        )
    }
}

export default UserProfile;