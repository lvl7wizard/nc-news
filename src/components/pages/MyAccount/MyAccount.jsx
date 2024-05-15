import { useContext } from "react";
import { UserContext } from "../../../contexts/User";
import ChangeAccount from "./ChangeAccount.jsx/ChangeAccount";
import styles from "./MyAccount.module.css";

const MyAccount = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <div className={styles.container}>
      {currentUser === null ? (
        <h2>You must be logged in to view your account</h2>
      ) : (
        <ChangeAccount />
      )}
    </div>
  );
};

export default MyAccount;