import React from 'react';
import { octokit } from "../config/GitApiConstants";


// export class UserKudos {
//     accessTokenKey: string;
//     ownerlogin: string;
//     imageUrl: string;
// }

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
            //let tmpKudos = [{ giverMemberId: 'User1', message: 'Ahoy' }, { giverMemberId: 'User2', message: 'Hola' }];
            // if (res && res.data && res.data.length > 0) {
            // res.data.map(kudo => {
            //     tmpKudos.push({
            //         giverMemberId: kudo.giverMemberId,
            //         message: kudo.message
            //     })
            // });

            this.getUserKudos();
        }
    }

    async getUserKudos() {
        let uri = "https://localhost:5001/api/values/" + this.state.receiverMember.name;
        let tmpKudos = [];
        fetch(uri).then(allKudos => allKudos.json()).then(memberKudos => {
            if (memberKudos && memberKudos.length > 0) {
                memberKudos.map(eachKudo => {
                    octokit.request('GET /users/' + eachKudo.user_id_assigned_by).then(res => {
                        if (res && res.data) {
                            tmpKudos.push({
                                "user_id_assigned_to": eachKudo.user_id_assigned_to,
                                "user_id_assigned_by": eachKudo.user_id_assigned_by,
                                "user_kudos_message": eachKudo.message,
                                "sender_info": res.data
                            });
                            this.setState({ kudos: tmpKudos });
                        }
                    });
                });
                this.setState({ kudos: tmpKudos });
            }
        });
    }

    insertUserKudos=() =>{
        const requestOptions2 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "user_id_assigned_to": this.state.receiverMember.name + "",
                "user_id_assigned_by": this.state.giverMemberName + "",
                "message": document.getElementById("enter_message") ? document.getElementById("enter_message").value + "" : ""
            })
        };
        fetch('https://localhost:5001/api/values', requestOptions2).then(()=>{
            this.getUserKudos();
        });
        this.getUserKudos();
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
                        <input id="enter_message" className="kudos-input width-full" placeholder="Enter a message..."></input>
                        <button className="give-kudos-button btn btn-primary" onClick={this.insertUserKudos}>Give Kudos</button>
                    </div>
                </div>
                <div>
                    <ul className="table-list center">
                        {
                            this.state.kudos.map((kudo) => {
                                return (
                                    <li className="table-list-item">
                                        <div className="table-list-cell member-avatar-cell">{this.getImage(kudo.sender_info)}</div>
                                        <div className="table-list-cell member-name">{kudo.user_id_assigned_by}</div>
                                        <div className="table-list-cell kudo-message">{kudo.user_kudos_message}</div>
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
