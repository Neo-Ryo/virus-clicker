import React from "react";
import { Input } from "semantic-ui-react";
import axios from 'axios'


class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pseudoTape: "",
      users:{}
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
      this.setState({ pseudoTape: event.target.value });
    }

    getUsers() {
      //const infoPokemon = result.data;
      axios
        .get(
          `https://virusclicker.herokuapp.com/users`
        )
        .then(res => {
          this.setState({ users: res.data[0]});
          console.log(res.data[0])
        });
    }

  componentDidMount() {
   this.getUsers()
   
  }



  render() {
    return (
      <>
        <Input
          placeholder="Pseudo"
          label={{ color: "red", corner: "right", icon: "asterisk" }}
          value={this.state.pseudoTape}
          id="pseudo"
          onChange={this.handleChange}
        />
        <p>{this.state.pseudoTape}</p>
        
        
      </>
    );
  }
}

export default CreateUser;
