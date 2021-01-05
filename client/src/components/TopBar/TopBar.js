import React from 'react';
import { useAuth } from '../../hooks/auth';
import { Link } from "react-router-dom";

import classNames from 'classnames/bind';
const cx = classNames.bind(require('./TopBar.module.scss'));

const TopBar = () => {
    const { session } = useAuth();

    const picture = session?.user?.picture;

    return(
        <div className={cx('topBar')}>
            <div className={cx('home', 'navItem')}>
                <Link className={cx('imgWrapper')} to={'/home'}>
                    Home
                </Link>
            </div>
            <div className={cx('profile', 'navItem')}>
                {
                    picture ? 
                    <Link className={cx('imgWrapper')} to={'/profile'}>
                        <img src={picture} className={cx('userImg')} alt='profile'/>
                    </Link>
                    : 
                    <Link to={'/profile'}>Profile</Link>
                }
                
            </div>
        </div>
    )
}

export default TopBar;