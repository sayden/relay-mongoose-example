class AddHobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hobby: ""};
  }

  onClick (event, something) {
    console.log(this.state.hobby);
    //TODO Launch mutation

  }

  handleChange (event) {
    this.setState({hobby:event.target.value});
  }

  render() {
    let value = this.state.value;
    return(
        <div>
          <input onChange={this.handleChange.bind(this)} value={value} type="text" placeholder="Format: 'Hobby.Description'" />
          <button onClick={this.onClick.bind(this)}>Add</button>
        </div>
    );
  }
}

class AddHobbyMutation extends Relay.Mutation {
  getMutation () {
    return Relay.QL`mutation { addHobby }`;
  }

  getVariables () {
    let hobbyTitle = this.props.hobby.title;
    let hobbyDescription = this.props.hobby.description;
    let userId = this.props.userId;

    return {hobbyTitle: hobbyTitle, hobbyDescription: hobbyDescription, userId:userId}
  }

  getFatQuery () {
    return Relay.QL`
      fragment on User {
        hobby {
          title
          description
        }
      }
    `
  }
}

export default AddHobby;