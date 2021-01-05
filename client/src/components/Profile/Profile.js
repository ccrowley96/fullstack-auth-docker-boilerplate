import { USER_QUERY } from '../../queries/profile';
import { useQuery } from '@apollo/client';
import Logout from '../Logout/Logout';
import { useTheme } from '../../hooks/provideTheme';

import classNames from 'classnames/bind';
const cx = classNames.bind(require('./Profile.module.scss'));

export default function Profile({user}){
    
    const { loading, error, data } = useQuery(USER_QUERY, {variables: {id: user._id}});
    const { toggleTheme } = useTheme();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
        
    if(data.user){
        let { user } = data;
        let registeredDate = new Date(Number(user.registered));
        return(
            <div className={cx('profileWrapper')}>
                <img style={{padding: "10px"}} alt="profile" src={user.picture} />
                <table>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>{user.name}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{user.email}</td>
                        </tr>
                        <tr>
                            <td>ID</td>
                            <td>{user.id}</td>
                        </tr>
                        <tr>
                            <td>Registered</td>
                            <td>{registeredDate.toLocaleString()}</td>
                        </tr>
                    </tbody>
                </table>

                <div className={cx('profileBtn')}>
                    <button className={cx('_btn')} onClick={() => toggleTheme()}>Change theme</button>
                </div>
                
                <div className={cx('profileBtn')}>
                    <Logout/>
                </div>

                <i>This is private content (you must be logged in to view)</i>
            </div>
        )
    } else{
        return null;
    }
}