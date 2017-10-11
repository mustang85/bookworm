import React, { Component } from 'react';
import { Form, Button, Message, Grid, Segment, Image } from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from '../messages/InlineError';
import PropTypes from 'prop-types';

class LoginForm extends Component {
  static propTypes = {
    submit: PropTypes.func.isRequired,
    book: PropTypes.shape({
      goodreadsId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      authors: PropTypes.string.isRequired,
      cover: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      pages: PropTypes.number.isRequired
    }).isRequired,
    covers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  };

  state = {
    data: {
      goodreadsId: this.props.book.goodreadsId,
      title: this.props.book.title,
      authors: this.props.book.authors,
      cover: this.props.book.covers[0],
      pages: this.props.book.pages
    },
    covers: this.props.book.covers,
    index: 0,
    loading: false,
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: {
        goodreadsId: nextProps.book.goodreadsId,
        title: nextProps.book.title,
        authors: nextProps.book.authors,
        cover: nextProps.book.covers[0],
        pages: nextProps.book.pages
      },
      covers: nextProps.book.covers,
    })
  }

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    })

  onChangeNumber = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: parseInt(e.target.value, 10) }
    })

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });

    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      // this.props
      //   .submit(this.state.data)
      //   .catch(err =>
      //     this.setState({ errors: err.response.data.errors, loading: false })
      //   );
      this.props.submit(this.state.data);
    }
  }

  changeCover = () => {
    const { index, covers } = this.state;
    const newIndex = index + 1 >= covers.length ? 0 : index + 1;
    this.setState({
      index: newIndex,
      data: { ...this.state.data, cover: covers[newIndex] }
    });
  }

  validate = (data) => {
    const errors = {};
    if (!data.title) errors.title = 'Can\'t be blank';
    if (!data.authors) errors.authors = 'Can\'t be blank';
    if (!data.pages) errors.pages = 'Can\'t be blank';
    return errors;
  }

  render() {
    console.log('BookForm', this.state);
    const { data, errors, loading } = this.state;

    return (
      <Segment>
        <Form onSubmit={this.onSubmit} loading={loading}>
          <Grid columns={2} fluid stackable>

            <Grid.Row>
              <Grid.Column>
                <Form.Field error={!!errors.title}>
                  <label htmlFor="title">Book Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Title"
                    value={data.title}
                    onChange={this.onChange}
                  />
                  {errors.title && <InlineError text={errors.title} />}
                </Form.Field>

                <Form.Field error={!!errors.authors}>
                  <label htmlFor="authors">Book Authors</label>
                  <input
                    type="text"
                    id="authors"
                    name="authors"
                    placeholder="Authors"
                    value={data.authors}
                    onChange={this.onChange}
                  />
                  {errors.authors && <InlineError text={errors.authors} />}
                </Form.Field>

                <Form.Field error={!!errors.pages}>
                  <label htmlFor="pages">Pages</label>
                  <input
                    type="number"
                    id="pages"
                    name="pages"
                    placeholder="pages"
                    value={data.pages}
                    onChange={this.onChangeNumber}
                  />
                  {errors.pages && <InlineError text={errors.pages} />}
                </Form.Field>
              </Grid.Column>

              <Grid.Column>
                <Image size="small" src={data.cover} />
                {this.state.covers.length > 1 && <a role="button" tabIndex={0} onClick={this.changeCover}>
                  Another cover</a>
                }
              </Grid.Column>

            </Grid.Row>

            <Grid.Row>
              <Button primary>Save</Button>
            </Grid.Row>

          </Grid>
        </Form>
      </Segment>
    );
  }
}

export default LoginForm;
