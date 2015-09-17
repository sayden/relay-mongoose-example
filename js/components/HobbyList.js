import Hobby from './Hobby.js';
import AddHobby from './AddHobby.js';

class HobbyList extends React.Component {
  render() {
    let user = this.props.user;
    let hobbies = user.hobbies.map((hobby) => {
      return <Hobby hobby={hobby} />;
    });

    return (<div>
              <div><AddHobby /></div>
              <div>{hobbies}</div>
            </div>);
  }
}

export default Relay.createContainer(HobbyList, {
  fragments: {
    user: () => Relay.QL`
      fragment users on User {
        hobbies {
          ${Hobby.getFragment('hobby')}
        }
      }`
  }
});