import React from "react";
import { Input } from "semantic-ui-react";
import axios from "axios";

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pseudoTape: "",
      users: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getUsers = this.getUsers.bind(this);
  }
  handleChange(event) {
    this.setState({ pseudoTape: event.target.value });
  }

  getUsers() {
    axios.get(`https://virusclicker.herokuapp.com/users`).then((res) => {
      this.setState({ users: res.data });
    });
  }
  handleSubmit() {
    const pseudos = this.state.users.map((user) => user.pseudo);
    if (
      pseudos.find(
        (pseudo) =>
          pseudo.toLowerCase() === this.state.pseudoTape.toLocaleLowerCase()
      )
    ) {
      alert("This pseudo is already taken.");
    } else {
      console.log("ok");
      {
        /*await POST method to API */
      }
    }
  }

  componentDidMount() {
    this.getUsers();
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

        <button onClick={this.handleSubmit}>Submit</button>
      </>
    );
  }
}

export default CreateUser;
