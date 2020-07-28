import React from 'react';
import { octokit } from "../config/GitApiConstants";
import { Link } from 'react-router-dom';

class Team extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            org: props.location.org,
            teams: []
        }
    }
    async componentDidMount() {
        if (this.state.org && this.state.org.id) {
            const res = await octokit.request('GET /orgs/' + this.state.org.name + '/teams');
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
                <div className="table-list-header">
                    <div className="table-list-header-item">
                        Teams
                    </div>
                </div>
                <div>
                    <ul className="table-list center">
                        {
                            this.state.teams.map((u) => {
                                return (
                                    <li className="table-list-item">
                                        <div className="table-list-cell member-name">{u.name}</div>
                                        <div className="table-list-cell">
                                            <Link className="table-list-cell-link" to={{ pathname: "/Members", team: u }}>
                                                View members
                                            </Link>
                                        </div>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </div>);
    }
}

export default Team;
