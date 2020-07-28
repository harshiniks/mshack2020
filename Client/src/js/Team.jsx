import React from 'react';
import {octokit} from "../config/GitApiConstants";
import { Link } from 'react-router-dom';

class Team extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        org: props.location.org,
        teams : []
    }
  }
  async componentDidMount() {
    if (this.state.org && this.state.org.id) {
        const res = await octokit.request('GET /orgs/'+this.state.org.name+'/teams');
        let tmpTeams = [];
        if (res && res.data && res.data.length > 0) {
            res.data.map(team => {
                tmpTeams.push({
                    id: team.id,
                    name: team.name,
                    url: team.url
                })
            });
            this.setState({
                teams: tmpTeams
            });
        }
    }
  }

  render() {
    return (
    <div className="App">
        <h1>Team</h1>
            <div>
                <table className="center">
                    <tbody>
                        {
                        this.state.teams.map((u) => {
                            return (
                                <tr>
                                    <td>{u.name}</td>
                                    <td>
                                        <Link style={{color: "blue"}} to={ {pathname:"/Members", team:u}}>
                                            Members
                                        </Link>
                                    </td>
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

export default Team;
