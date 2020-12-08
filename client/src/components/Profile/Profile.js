import { USER_QUERY } from '../../queries/profile';
import { useQuery } from '@apollo/client';
import './Profile.scss'
import { useAuth } from '../../services/auth';

export default function Profile({user}){
    
    const { loading, error, data } = useQuery(USER_QUERY, {variables: {id: user._id}});

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
        
    if(data.user){
        let { user } = data;
        let registeredDate = new Date(Number(user.registered));
        return(
            <div className="profileWrapper">
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
            </div>
        )
    } else{
        return null;
    }
}