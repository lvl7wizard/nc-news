import { useContext, useEffect, useState } from 'react';
import { UserContext } from "../contexts/User";
import { fetchUsers } from "../utils/apiRequest";
import UserCard from './myaccount_components/UserCard';

const MyAccount = () => {
    const { currentUser } = useContext(UserContext)
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        fetchUsers()
        .then((response) => {
            setUsers(response)
        }).then(() => {
            setIsLoading(false)
        })
    }, [])


    if (isLoading) {
        return <>Loading...</>
    }
    else {
    return (<div>
    <p className="logged-in-as">You are currently logged in as <strong>{currentUser.username}</strong>.</p>
    <p className="logged-in-as">Click below to change account</p>
    <></>
    <div className="user-card-container">
    {users.map((user) => {
        return <UserCard key={user.username} user={user}/>
    })}
    </div>
    </div>)
    }
}

export default MyAccount;