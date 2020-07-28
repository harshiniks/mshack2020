import React from 'react';
import { octokit } from "../config/GitApiConstants";

class TeamMembers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            team: props.location.team,
            teamMembers: []
        }
    }
    async componentDidMount() {
        if (this.state.team && this.state.team.url) {
            const res = await octokit.request('GET ' + this.state.team.url + '/members');
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
        return (<img className="member-avatar" key={mem.id} src={mem.image} alt={mem.name} />);
    }
    render() {
        return (
            <div className="App">
                <div className="table-list-header">
                    <div className="table-list-header-item">
                        {this.state.team.name}
                    </div>
                </div>
                <div>
                    <ul className="table-list center">
                        {
                            this.state.teamMembers.map((u) => {
                                return (
                                    <li className="table-list-item">
                                        <div className="table-list-cell member-avatar-cell">{this.getImage(u)}</div>
                                        <div className="table-list-cell member-name">{u.name}</div>
                                        <div  className="table-list-cell">
                                            <button className="kudos-button btn btn-primary">Kudos</button>
                                        </div>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default TeamMembers;
