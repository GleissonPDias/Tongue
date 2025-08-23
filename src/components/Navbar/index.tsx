import { CgFeed } from "react-icons/cg";
import { IoIosNotifications, IoIosSearch } from "react-icons/io";
import { LuMessagesSquare } from "react-icons/lu";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import styles from "./styles.module.css";

export function Navbar() {
  return (
    <div className={styles.navbar}>
      <ul>
        <Link to="/News">
          <CgFeed color="#03bfcb" size="33" />
        </Link>
      </ul>
      <ul>
        <Link to="/Userpage">
          <FaUser color="#03bfcb" size="33" />
        </Link>
      </ul>
      <ul>
        <IoIosSearch color="#03bfcb" size="33" />
      </ul>
      <ul>
        <LuMessagesSquare color="#03bfcb" size="33" />
      </ul>
      <ul>
        <IoIosNotifications color="#03bfcb" size="33" />
      </ul>
    </div>
  );
}
