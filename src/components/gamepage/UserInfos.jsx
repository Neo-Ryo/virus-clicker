import React from 'react';
import axios from 'axios';
import { Loader } from 'semantic-ui-react';
import {
  Button,
  PopoverHeader,
  PopoverBody,
  UncontrolledPopover,
} from 'reactstrap';

export default function User({ pseudo, team, logo, isLoading, error }) {
  // async getUser() {
  //   // this.setState({ id: window.localStorage.getItem('uuid') });
  //   const uuid = window.localStorage.getItem('uuid');
  //   // const { userPseudo, logo, team } = this.state;
  //   try {
  //     const res = await axios.get(`https://virus-clicker.herokuapp.com/users/${uuid}`);
  //     this.setState({
  //       userPseudo: res.data.pseudo,
  //       logo: res.data.Team.logo,
  //       team: res.data.Team.name,
  //     });
  //   } catch (err) {
  //     this.setState({ error: err });
  //   } finally {
  //     this.setState({ isLoading: false });
  //   }
  // }

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <p>Error!</p>;
  }
  return (
    <>
      <Button id="PopoverLegacy" type="button" color="danger">
        Profil
      </Button>

      <UncontrolledPopover
        trigger="legacy"
        placement="bottom"
        target="PopoverLegacy"
      >
        <PopoverHeader>
          <h5>{pseudo}</h5>
          <h6>{team}</h6>
        </PopoverHeader>
        {/* <PopoverHeader>
          {' '}
        </PopoverHeader> */}
        <PopoverBody>
          <img src={logo} alt={team} />
        </PopoverBody>
      </UncontrolledPopover>
    </>
  );
}
