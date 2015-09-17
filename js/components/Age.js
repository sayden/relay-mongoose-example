class Age extends React.Component {

  constructor(props){
    super(props);;
    this.state = {editMode: false};
  }

  onClick () {
    if (this.state.age == undefined) this.state.age = this.props.user.age;

    this.setState({editMode:false});

    Relay.Store.update(new UserMutation({age: this.state.age, userId: this.props.user.id}));
  }

  handleChange (event) {
    this.setState({age:event.target.value});
  }

  enterEditMode (event) {
    this.setState({editMode:true})
  }

  render() {
    let component;
    let age = this.state.age || this.props.user.age;

    if(this.state.editMode){
      component =
        <div>
          <input onChange={this.handleChange.bind(this)} value={age} type="text" placeholder="Enter new Age" />
          <button onClick={this.onClick.bind(this)}>Add</button>
        </div>
      ;
    } else {
      component =
        <div onClick={this.enterEditMode.bind(this)}>
          <h1>Age: {age}</h1>
        </div>
      ;
    }

    return component;
  }
}


//class UserMutation extends Relay.Mutation {
//  getMutation () {
//    console.log("getMutation");
//    return Relay.QL`mutation { updateUser }`;
//  }
//
//  getVariables () {
//    console.log("getVariables", this.props);
//    let age = this.props.age;
//    let userId = this.props.userId;
//
//    return {age: age, userId:userId}
//  }
//
//  getFatQuery () {
//    console.log("getFatQuery", this.props);
//    return Relay.QL`
//      fragment on User {
//        user { age }
//      }
//    `
//  }
//
//  getConfigs () {
//    console.log("getConfigs", this.props);
//    return [{
//      type: 'FIELDS_CHANGE',
//      fieldIDs: {
//        age: this.props.age
//      }
//    }];
//  }
//
//  static fragments = {
//    user: () => Relay.QL`
//      fragment on User {
//        age
//      }
//    `
//  };
//
//}

export default Age;