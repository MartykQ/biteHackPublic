import React from 'react';
import styled from 'styled-components';
import ee from 'event-emitter';

const Container = styled.div`
    background-color: #444;
    color: white;
    padding: 16px;
    position: fixed;
    top: 90px;
    left: 10px;
    width: 300px;
    opacity: ${props => props.opacity};
    z-index: 999;
    transition: opacity 0.5s ease;
    height: 500px;
`;

const emitter = new ee();

export const notify = (msg) => {
    emitter.emit('notification', msg);
}

export default class Notifications extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            opacity: 0,
            msg: '',
        }

        this.timeout = null;
        emitter.on('notification', (msg) => {
            this.onShow(msg);
        })
    }

    onShow = (msg) => {
        if(this.timeout) {
            clearTimeout(this.timeout);
            this.setState({
                opacity: 0,
            }, () => {
                this.timeout = setTimeout(() => {
                    this.showNotification(msg);
                }, 500)
            })
        }else {
            this.showNotification(msg)
        }
    }


    showNotification = (msg) => {
        this.setState({
            opacity: 1,
            msg: msg,
        }, () => {
            this.timeout = setTimeout(() => {
                this.setState({
                    opacity: 0,
                });
            }, 3000)
        })


    }

    render() {
        
        return(
            <React.Fragment>
                <Container opacity={this.state.opacity}><span className="fas fa-bell" style={{textAlign: "right"}}></span>{this.state.msg} </Container>
            </React.Fragment>
        );

    }


}