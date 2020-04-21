import React from "react";
import { Input } from "semantic-ui-react";
import styles from "./createUser.module.css";

function CreateUser() {
  return (
    <>
      <Input placeholder="Pseudo"
      label={{ color: 'red', corner: 'right', icon: 'asterisk' }}
      />
    </>
  );
}

export default CreateUser;
