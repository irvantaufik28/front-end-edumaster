import "./styles/topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
export default function Topbar() {

  const [cookies] = useCookies(['token']);
  const token = cookies.token?? null;
  const [user, setUser] = useState('')

  useEffect(() => {
    if (token) {
      const tokenDecode = jwtDecode(token);
      setUser(tokenDecode)
    }
  }, [token]);

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">edumaster Hub</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img src={user?.user_detail?.foto_url} alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
