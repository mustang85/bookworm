import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Message } from 'semantic-ui-react';
import isEmail from 'validator/lib/isEmail';
import InlineError from '../messages/InlineError';

export default class SignupForm extends React.Component {
  static propTypes = {
    submit: PropTypes.func.isRequired
  };

  state = {
  	data: {
  		email: '',
  		password: ''
  	},
  	loading: false,
  	errors: {}
  }

  onChange = e => 
  	this.setState({
  		...this.state,
  		data: { ...this.state.data, [e.target.name]: e.target.value }
  	})

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });

    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      console.log('this.state.data', this.state.data);
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
      // this.props.submit(this.state.data);
    }
  }

  validate = (data) => {
  	const errors = {};

  	if (!isEmail(data.email)) errors.email = 'Invalid email';
  	if (!data.password) data.password = 'Can\'t be blank';

  	return errors;
  }

  render() {
  	const { data, errors, loading } = this.state;
    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
      { errors.email && (
          <Message negative>
            <Message.Header>{errors.email}</Message.Header>
          </Message>
        )}
      	<Form.Field error={!!errors.email}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@example.com"
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>
        <Form.Field error={!!errors.password}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder=""
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>
      	<Button primary>Sign up</Button>
      </Form>
    );
  }
}
