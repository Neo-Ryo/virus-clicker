import React from 'react';
import axios from 'axios';
import { Loader, Image } from 'semantic-ui-react';
import {
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
  UncontrolledPopover,
} from 'reactstrap';

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
      <>
        <Button id="PopoverLegacy" type="button"   color="danger">
          Profil
        </Button>

        <UncontrolledPopover
          trigger="legacy"
          placement="bottom"
          target="PopoverLegacy"
        >
          <PopoverHeader>
            <h5>{userPseudo}</h5>
          </PopoverHeader>
          <PopoverHeader>
            {' '}
            <h6>{team}</h6>
          </PopoverHeader>
          <PopoverBody>
            <img src={logo} alt={team} />
          </PopoverBody>
        </UncontrolledPopover>
      </>
    );
  }
}

export default User;
