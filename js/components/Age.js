import AgeMutation from './AgeMutation.js';

class Age extends React.Component {

  constructor(props){
    super(props);
    this.state = {editMode: false};
  }

  onClick () {
    if (this.state.age == undefined) this.state.age = this.props.user.age;

    this.setState({editMode:false});
    Relay.Store.update(new AgeMutation({age: this.state.age, user: this.props.user}));
    //this.props.onSave(this.state.age);
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

export default Relay.createContainer(Age, {
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