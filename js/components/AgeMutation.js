export default class UserMutation extends Relay.Mutation {
  static fragments = {
    age: () => Relay.QL`
      fragment on User {
        id
      }
    `
  };

  getMutation () {
    return Relay.QL`mutation { updateAge }`;
  }

  getVariables () {
    let age = this.props.age;
    let userId = this.props.userId;

    return {age: age, userId:userId}
  }

  getFatQuery () {
    console.log("getFatQuery", this.props);
    return Relay.QL`
      fragment on UpdateAgePayload {
        user { age }
      }
    `
  }

  getConfigs () {
    console.log("getConfigs", this.props);
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        user: this.props.user.id
      }
    }];
  }

  getOptimisticResponse() {
    return {
      user: {
        id: this.props.user.id,
        age: this.props.age
      }
    };
  }

}
