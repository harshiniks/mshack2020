import React from 'react';
import { Link } from 'react-router-dom';
import {gituser, octokit} from "../config/GitApiConstants";

class Organizations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        organisations : []
    }
  }
  async componentDidMount() {
    const res = await octokit.request('GET /users/'+gituser+'/orgs');
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
        <h1>Organizations</h1>
            <div>
                <table className="center">
                    <tbody>
                    {
                        this.state.organisations.map((u) => {
                            return (
                                <tr>
                                    <td>
                                        <Link style={{color: "white"}} to={ {pathname:"/Team", org:u}}>
                                            {this.getImage(u)}
                                        </Link>
                                    </td>
                                    <td>{u.name}</td>
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

export default Organizations;
