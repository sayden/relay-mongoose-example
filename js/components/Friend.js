import Relay from 'react-relay';
import React from 'react';
class Friend extends React.Component {
  render() {
    let friend = this.props.friend;
    let friendUrl = '?user=' + friend.id;
    return (
      <li>
        <a href={friendUrl}>{friend.name} {friend.surname} ({friend.age}) </a>
      </li>
    );
  }
}

export default Relay.createContainer(Friend, {
  fragments: {
    friend: () => Relay.QL`
      fragment on User {
        id
        name
        surname
        age
      }`
  }
});