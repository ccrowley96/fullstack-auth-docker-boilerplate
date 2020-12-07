import { useAuth } from "../../services/auth";
import './Profile.scss'

export default function Profile(){
    let auth = useAuth();
    let user = auth.user;
    if(user){
        return(
            <div className="profileWrapper">
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
                            <td>{user._id}</td>
                        </tr>
                    </tbody>
                    
                </table>
            </div>
        )
    } else{
        return null;
    }
}