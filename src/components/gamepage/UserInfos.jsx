import React from "react";
import axios from "axios";
import styles from "./styles/userInfos.module.css";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      logo: null,
      team: null,
    };
    this.getUser = this.getUser.bind(this);
  }
  getUser() {
    axios
      .get("https://virusclicker.herokuapp.com/docs/#/user/getUsers")
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          id: data.pseudo,
          logo: data.logo,
          team: data.team,
        });
      });
  }
  render() {
    return (
      <div className={styles.userBlock}>
        <p className={styles.pseudoName}>
          {this.state.id ? this.state.id : "Loading..."}
        </p>
        <img
          src={
            this.state.logo ? this.state.id : "https://via.placeholder.com/70"
          }
          alt={this.state.team}
        />
        <p className={styles.teamName}>
          {this.state.team ? this.state.team : "Loading..."}
        </p>
      </div>
    );
  }
}

export default User;
