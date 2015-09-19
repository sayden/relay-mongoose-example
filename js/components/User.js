import HobbyList from './HobbyList.js';
import FriendsList from './FriendsList.js';
import Age from './Age.js';
import AgeMutation from './AgeMutation.js';

class User extends React.Component {
  changeAge (age){
    console.log(this);
    Relay.Store.update(new AgeMutation({age: parseInt(age), user: this.user}));
  }

  render() {
    var user = this.props.user;

    return (
      <div>
        <h1>Hello {user.name} {user.surname}</h1>
        <h2>Hobbies</h2>
        <HobbyList user={user} />
        <h2>Friends</h2>
        <FriendsList user={user} />
        <Age user={user} onSave={this.changeAge} />
      </div>
    );
  }
}

export default Relay.createContainer(User, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id
        name
        surname
        ${Age.getFragment('user')}
        ${HobbyList.getFragment('user')}
        ${FriendsList.getFragment('user')}
        ${AgeMutation.getFragment('user')}
      }
    `
  }
});