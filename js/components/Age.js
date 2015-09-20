class Age extends React.Component {

  constructor(props){
    super(props);
    this.state = {editMode: false};
  }

  saveAge = () => {
    if (this.state.age == undefined) this.state.age = this.props.user.age;

    this.setState({editMode:false});

    Relay.Store.update(new AgeMutation({
      age: this.state.age,
      user: this.props.user
    }));
  };

  handleChange = (event) => {
    this.setState({age:event.target.value});
  };

  handleKeyDown = (event) => {
    let ENTER_KEY_CODE = 13;
    let ESC_KEY_CODE = 27;

    if(event.keyCode === ENTER_KEY_CODE){
      this.saveAge();
    }
  };

  enterEditMode = (event) => {
    this.setState({editMode:true})
  };

  render() {
    let component;
    let age = this.state.age != undefined ? this.state.age : this.props.user.age;

    if(this.state.editMode){
      component =
        <div>
          <input onKeyDown={this.handleKeyDown} onChange={this.handleChange} value={age} type="text" placeholder="Enter new Age" />
          <button onClick={this.saveAge}>Add</button>
        </div>
      ;
    } else {
      component =
        <div onClick={this.enterEditMode}>
          <h2>Age: {age} (click me to change my age)</h2>
        </div>
      ;
    }

    return component;
  }
}

exports.Age = Relay.createContainer(Age, {
  fragments: {
    // You can compose a mutation's query fragments like you would those
    // of any other RelayContainer. This ensures that the data depended
    // upon by the mutation will be fetched and ready for use.
    user: () => Relay.QL`
      fragment on User {
        age
        ${AgeMutation.getFragment('user')},
      }
    `
  }
});


class AgeMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id
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

  getOptimisticResponse() {
    return {
      user: {
        id: this.props.user.id,
        age: this.props.age
      },
    };
  }
}

exports.AgeMutation = AgeMutation;