import { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import API_URL from "../constants";
import MyPro from './MyProducts'

function MyProfile() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const url = `${API_URL}/my-profile/${localStorage.getItem('userId')}`;
        axios.get(url)
            .then((res) => {
                if (res.data.user) {
                    setUser(res.data.user);
                }
            })
            .catch((err) => {
                alert('Server Err.');
            });
    }, []);

    return (
        <div>
            <Header />
            <div className="profile-container">
                <h3 className="text-center profile-title">USER PROFILE</h3>
                <table className="table table-bordered profile-table">
                    <thead>
                        <tr>
                            <th>USERNAME</th>
                            <th>EMAIL ID</th>
                            <th>MOBILE</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <MyPro />
        </div>
    );
}

export default MyProfile;
