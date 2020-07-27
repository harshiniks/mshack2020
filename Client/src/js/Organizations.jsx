import React from 'react';
import { Link } from 'react-router-dom';

class Organizations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        organisations : []
    }
  }
  componentDidMount() {
    this.setState({
        organisations: [
            {
                id: 1,
                name: "Microsoft",
                image: "resources/microsoft.png"
            },
            {
                id: 2,
                name: "Github",
                image: "resources/docs.png"
            },
            {
                id: 3,
                name: "Github-interviews",
                image: "resources/github-interviews.png"
            },
            {
                id: 4,
                name: "Docs",
                image: "resources/docs.png"
            }
        ]
    })
  }
  getImage(org) {
    return (<img key={org.id} src={`${process.env.PUBLIC_URL +org.image}`} alt={org.name} />);
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
