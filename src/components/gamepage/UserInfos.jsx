import React from 'react';
import axios from 'axios';
import { Loader } from 'semantic-ui-react';
import styles from './styles/userInfos.module.css';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userPseudo: null,
      logo: null,
      team: null,
      isLoading: true,
    };
    this.getUser = this.getUser.bind(this);
  }

  componentDidMount() {
    // const { userPseudo, logo, team } = this.state;

    this.getUser();
    // const { uuid } = window.localStorage.getItem('uuid');
    // console.log(userPseudo, logo, team);
  }

  async getUser() {
    // this.setState({ id: window.localStorage.getItem('uuid') });
    const uuid = window.localStorage.getItem('uuid');
    // const { userPseudo, logo, team } = this.state;
    try {
      const res = await axios.get(
        `https://virusclicker.herokuapp.com/users/${uuid}`
      );
      this.setState({
        userPseudo: res.data.pseudo,
        logo: res.data.Team.logo,
        team: res.data.Team.name,
      });
    } catch (err) {
      this.setState({ error: err });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { userPseudo, logo, team, isLoading, error } = this.state;
    if (isLoading) {
      return <Loader />;
    }
    if (error) {
      return <p>Error!</p>;
    }
    return (
      <div className={styles.userBlock}>
        <p className={styles.pseudoName}>{userPseudo}</p>
        <img src={logo} alt={team} />
        <p className={styles.teamName}>{team}</p>
      </div>
    );
  }
}

export default User;
