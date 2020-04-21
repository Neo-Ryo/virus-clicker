import React from "react";
import { Input } from "semantic-ui-react";


const userOne = {
  uuid: "uuidv4",
  pseudo: "Mdoudou",
  score: 10000,
};


class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pseudoTape: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    if (!event.target.value.includes("*")) {
      this.setState({ pseudoTape: event.target.value });
    }
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
