import React from 'react';

class Team extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        org: props.location.org,
        team : []
    }
  }
  componentWillMount() {
    if (this.state.org && this.state.org.id) {
        for (let i =1; i<5; i++) {
            this.state.team.push({
                id : this.state.org.id+i,
                name: this.state.org.name+' employee '+i
            })
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
                        this.state.team.map((u) => {
                            return (
                                <tr>
                                    <td>{u.name}</td>
                                    <td><button className="kudosbutton">Give Kudos</button></td>
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
