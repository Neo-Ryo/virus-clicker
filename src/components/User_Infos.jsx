import React from 'react';

class user extends React.Component{
    constructor (props){
        super(props);
        this.state = {
            id : "Pseudo",
            logo: "https://via.placeholder.com/50",
            team: "Wilders",
        }
    }
    render () {
        return(
            <div>
                <h2>{this.state.id}</h2>
                <img src={this.state.logo} alt={this.state.team}/>
                <h3>{this.state.team}</h3>
            </div>
        )
    }
}

export default user;