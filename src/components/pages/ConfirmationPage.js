import React from 'react';
import { Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { confirm } from '../../actions/auth';

class ConfirmationPage extends React.Component {
  static propTypes = {
    confirm: PropTypes.func.isRequired,
    match: PropTypes.shape({
    	params: PropTypes.shape({
    		token: PropTypes.string.isRequired
    	}).isRequired
    }).isRequired
  };

  state = {
  	loading: true,
  	success: false
  };

  componentDidMount() {
  	console.log('props', this.props);
  	this.props.confirm(this.props.match.params.token)
  	.then(() => this.setState({ loading: false, success: true }))
  	.catch(() => this.setState({ loading: false, success: false }));
  }

  render() {
  	const { loading, success } = this.state;
    return (
      <div>
      	{loading && (
      		<Message icon>
      			<Icon name="circle notched" loading />
      			<Message.Header>Validating your email</Message.Header>
      		</Message>
      	)}

      	{!loading && 
      		success && (
	      		<Message success icon>
	      			<Icon name="checkmark" />
	      			<Message.Content>
		      			<Message.Header>
		      				Thank you. Your account has been verified.
		      			</Message.Header>
		      			<Link to="/dashboard">Go to your dashboard</Link>
	      			</Message.Content>
	      		</Message>
      	)}

      	{!loading && !success && (
	      		<Message negative icon>
	      			<Icon name="warning sign" />
	      			<Message.Content>
		      			<Message.Header>
		      				Ooops. Invalid token it seems.
		      			</Message.Header>
	      			</Message.Content>
	      		</Message>
      	)}
      </div>
    );
  }
}

export default connect(null, { confirm })(ConfirmationPage);