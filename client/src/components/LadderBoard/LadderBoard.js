import React from 'react';
import axios from '../../axios-main';
import styles from './LadderBoard.module.css';

class LadderBoard extends React.Component {

    state =  {
        users: [
            {
                "nickname": "damianosPL4life"
            },
            {
                "nickname": "Miauurush123"
            }
        ]
    }


    fetchData = () => {
        axios.get('leaderboards', {
            headers: {
                'x-access-token': this.props.token,
            }
        }).then(res => {
            console.log(res.data)
            this.setState({
                users: res.data
            })
        })
    }

    componentDidMount() {
        this.fetchData()
    }

    render() {
        let iter = 0;
        let ranking = this.state.users.map(usr => {
            iter++;
            return (
                <div className={styles.backgroundzik}>
                    <div className={styles.RankingRecord}>{iter}. {usr.nickname}</div>
                </div>
            )
        })

        return (
            <div className={styles.Wrapper}>
                {ranking}
            </div>
        )
    }

}

export default LadderBoard;