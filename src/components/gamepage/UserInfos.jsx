import React from 'react';
import axios from 'axios';
import styles from './styles/userInfos.module.css';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 'uuid',
      logo: null,
      team: null,
    };
    this.getUser = this.getUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    this.setState({ id: window.localStorage.getItem('uuid') });
    axios
      .get(
        'https://virusclicker.herokuapp.com/users/d44a7346-1167-4e1c-9fa5-21453ffaac9d'
      )
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          id: data.pseudo,
          logo: data.Team.logo,
          team: data.Team.name,
        });
      });
  }

  render() {
    const { id, logo, team } = this.state;
    return (
      <div className={styles.userBlock}>
        <p className={styles.pseudoName}>{id || 'Loading...'}</p>
        <img src={logo || 'https://via.placeholder.com/70'} alt={team} />
        <p className={styles.teamName}>{team || 'Loading...'}</p>
      </div>
    );
  }
}

export default User;
