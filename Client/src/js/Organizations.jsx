import React from 'react';
import { Link } from 'react-router-dom';
import { gituser, octokit } from "../config/GitApiConstants";

class Organizations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            organisations: []
        }
    }
    async componentDidMount() {
        const res = await octokit.request('GET /users/' + gituser + '/orgs');
        let tmpOrgs = [];
        if (res && res.data && res.data.length > 0) {
            res.data.map(org => {
                tmpOrgs.push({
                    id: org.id,
                    name: org.login,
                    image: org.avatar_url
                })
            });
            this.setState({
                organisations: tmpOrgs
            });
        }
    }
    getImage(org) {
        return (<img key={org.id} src={org.image} alt={org.name} height="70"/>);
    }
    render() {
        return (
            <div className="App">
                <div className="table-list-header">
                    <div className="table-list-header-item">
                        Organizations
                    </div>
                </div>
                <div>
                    <ul className="table-list center">
                        {
                            this.state.organisations.map((u) => {
                                return (
                                    <li className="table-list-item">
                                        <div className="table-list-cell member-avatar-cell">
                                            <Link to={{ pathname: "/Team", org: u }}>
                                                {this.getImage(u)}
                                            </Link>
                                        </div>
                                        <div className="table-list-cell member-name">{u.name}</div>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </div>);
    }
}

export default Organizations;
