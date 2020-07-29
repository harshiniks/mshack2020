import React from 'react';
import { octokit } from "../config/GitApiConstants";

class MemberKudos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            giverMemberName: 'chandrasekharmudili',
            receiverMember: props.location.receiverMember,
            kudos: []
        }
    }
    async componentDidMount() {
        if (this.state.giverMemberName && this.state.receiverMember) {
            // const res = await octokit.request('GET ' + this.state.receiverMember.id + '/kudos');
            let tmpKudos = [{giverMemberId: 'User1', message: 'Ahoy'}, {giverMemberId: 'User2', message: 'Hola'}];
            // if (res && res.data && res.data.length > 0) {
            // res.data.map(kudo => {
            //     tmpKudos.push({
            //         giverMemberId: kudo.giverMemberId,
            //         message: kudo.message
            //     })
            // });
            this.setState({
                kudos: tmpKudos
            });
            // }
        }
    }
    getImage(mem) {
        return (<img className="member-avatar" key={mem.id} src={mem.image} alt={mem.name} />);
    }
    render() {
        return (
            <div className="App">
                <div className="table-list-header table-list-large-header">
                    <div className="table-list-header-item">
                        <div className="member-avatar-cell">{this.getImage(this.state.receiverMember)}</div>
                        <div>{this.state.receiverMember.name}</div>
                    </div>
                    <div className="table-list-header-item">
                        <input className="kudos-input width-full" placeholder="Enter a message..."></input>
                        <button className="kudos-button btn btn-primary">Give Kudos</button>
                    </div>
                </div>
                <div>
                    <ul className="table-list center">
                        {
                            this.state.kudos.map((kudo) => {
                                return (
                                    <li className="table-list-item">
                                        <div className="table-list-cell member-name">{kudo.giverMemberId}</div>
                                        <div className="table-list-cell">{kudo.message}</div>
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

export default MemberKudos;
