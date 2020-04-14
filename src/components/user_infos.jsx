import React from 'react';

class user extends React.Component{
    constructor (id, logo, team){
        super(id,logo,team);
        this.state = {
            id : "",
            logo: "",
            team: "",
        }
    }
}