import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../contexts/User";
import { fetchUsers } from "../../../../utils/apiRequest";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";

const AccountsTable = ({isLoading, setIsLoading}) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetchUsers().then((response) => {
      setUsers(response);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return null;
  } else {
    return (
        <Table responsive striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Avatar</th>
              <th >Username</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const isCurrentUser = user.username === currentUser.username;
              const userOnClickHandler = () => {
                setCurrentUser(user);
              };
              return (
                <tr key={user.username} onClick={userOnClickHandler}>
                  <td>
                    <Image
                      src={user.avatar_url}
                      style={{ background: "white", height: "80px" }}
                      />
                  </td>
                  <td
                    style={{ color: isCurrentUser ? "#198754" : null }}
                    >
                    {user.username}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
    );
  }
};

export default AccountsTable;
