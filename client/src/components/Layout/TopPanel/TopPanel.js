import React from 'react';
import styles from './TopPanel.module.css';
import { NavLink } from 'react-router-dom';

class TopPanel extends React.Component {

    state = {
        checked: false,
    }

    closePanel = () => {
        this.setState({
            checked: false,
        })
    }

    menuToggle = () => {
        this.setState({
            checked: !this.state.checked
        })
    }

    render() {
        return(
            <div className={styles.Wrapson}>
                <nav role="navigation">
                <div className={styles.menuToggle}>
            
                    <input type="checkbox" checked={this.state.checked} onClick={this.menuToggle}/>
                    
                    <span></span>
                    <span></span>
                    <span></span>
                    
                    <ul className={styles.menu}>
                        <NavLink onClick={this.closePanel} to="/"><li>Home</li></NavLink>
                        <NavLink onClick={this.closePanel} to="/app"><li>Profile</li></NavLink>
                        <NavLink onClick={this.closePanel} to="/leader"><li>Leaderboards</li></NavLink>
                        <NavLink onClick={this.closePanel} to="/donate"><li>Donate!</li></NavLink>
                        <a href="#" target="_blank"><li>Show me more</li></a>
                    </ul>
                </div>
                </nav>
            </div>
            )
    }

}
export default TopPanel;