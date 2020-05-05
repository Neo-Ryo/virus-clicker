// import React from 'react';
// import axios from 'axios';
// import CreateTeamTitles from './CreateTeamTitles';
// import CreateTeamInput from './CreateTeamInput';
// import CreateTeamLogo from './CreateTeamLogo';
// import CreateTeamStartButton from './CreateTeamStartButton';
// import CreateUser from './CreateUser';

// class CreateTeamPage extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       teams: {},
//       teamTape: '',
//       logo: '',
//     };
//     this.getTeams = this.getTeams.bind(this);
//     this.searchingTeam = this.searchingTeam.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//     this.getUrl = this.getUrl.bind(this);
//   }
//   handleChange(e) {
//     this.setState({ teamTape: e.target.value });
//   }
//   getUrl(e) {
//     this.setState({ logo: e.target.value });
//   }
//   componentDidMount() {
//     this.getTeams();
//   }
//   getTeams() {
//     axios.get(`https://virusclicker.herokuapp.com/teams`).then((res) => {
//       this.setState({ teams: res.data });
//       console.log(res.data);
//     });
//   }
//   searchingTeam() {
//     const teamName = this.state.teams.map((team) => team.name);
//     console.log(teamName);
//     if (
//       teamName.find(
//         (team) => team.toLowerCase() === this.state.teamTape.toLowerCase()
//       )
//     ) {
//       alert('Team name is already taken');
//     } else if (this.state.teamTape.includes(' ')) {
//       alert("Don't use spaces");
//     }
//   }
//   render() {
//     return (
//       <>
//         <CreateTeamTitles />
//         <CreateUser />
//         <CreateTeamInput
//           teamTape={this.state.teamTape}
//           handleChange={this.handleChange}
//         />
//         <CreateTeamLogo logo={this.state.logo} getUrl={this.getUrl} />
//         <CreateTeamStartButton searchingTeam={this.searchingTeam} />
//       </>
//     );
//   }
// }
// export default CreateTeamPage;
