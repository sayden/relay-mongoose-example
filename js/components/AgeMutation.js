export default class UserMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        age
      }
    `
  };

  getMutation () {
    console.log("getMutation");
    return Relay.QL`mutation { updateAge }`;
  }

  getVariables () {
    console.log("getVariables", this.props);
    let age = this.props.age;
    let userId = this.props.userId;

    return {age: age, userId:userId}
  }

  getFatQuery () {
    console.log("getFatQuery", this.props);
    return Relay.QL`
      fragment on User {
        users { age }
      }
    `
  }

  getConfigs () {
    console.log("getConfigs", this.props);
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        age: this.props.age
      }
    }];
  };

}
