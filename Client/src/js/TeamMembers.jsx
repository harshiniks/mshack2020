import React from 'react';
import {octokit} from "../config/GitApiConstants";

class TeamMembers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        team: props.location.team,
        teamMembers : []
    }
  }
  async componentDidMount() {
    if (this.state.team && this.state.team.url) {
        const res = await octokit.request('GET '+ this.state.team.url+'/members');
        let tmpMembers = [];
        if (res && res.data && res.data.length > 0) {
            res.data.map(mem => {
                tmpMembers.push({
                    id: mem.id,
                    name: mem.login,
                    image: mem.avatar_url             
                })
            });
            this.setState({
                teamMembers: tmpMembers
            });
        }
    }
  }
  getImage(mem) {
    return (<img key={mem.id} src={mem.image} alt={mem.name} height="70"/>);
  }
  render() {
    return (
    <div className="App">
        <h1>{this.state.team.name}</h1>
            <div>
                <table className="center">
                    <tbody>
                        {
                        this.state.teamMembers.map((u) => {
                            return (
                                <tr>
                                    <td>{u.name}</td>
                                    <td>{this.getImage(u)}</td>
                                </tr>
                            );
                        })
                        }
                    </tbody>
                </table>
            </div>
    </div>);
}
}

export default TeamMembers;
