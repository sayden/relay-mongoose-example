export default class AgeMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id
        age
      }
    `
  };

  getMutation () {
    return Relay.QL`mutation { updateAge }`;
  }

  getVariables () {
    return {
      age: this.props.age,
      id: this.props.user.id
    }
  }


  getFatQuery () {
    return Relay.QL`
      fragment on UpdateAgePayload {
        user {
          age
        }
      }
    `
  }

  getConfigs () {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        user: this.props.user.id
      }
    }];
  }

  //getOptimisticResponse() {
  //  return {
  //    user: {
  //      id: this.props.user.id,
  //      age: this.props.age
  //    },
  //  };
  //}
}
