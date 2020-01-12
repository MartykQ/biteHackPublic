import React from 'react';
import styles from './Layout.module.css';
import TopPanel from './TopPanel/TopPanel.js';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

const layout = (props) => {
    return (
        <React.Fragment>
            <TopPanel />
            <main>
            <NotificationContainer />
                {props.children}
            </main>
        </React.Fragment>
    )
}

export default layout;