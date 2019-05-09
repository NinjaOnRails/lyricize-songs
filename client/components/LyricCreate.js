import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: '' };
  }

  onSubmit() {
    event.preventDefault();
    const { mutate, songId } = this.props;
    mutate({
      variables: {
        songId,
        content: this.state.content,
      },
    }).then(() => this.setState({ content: '' }));
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)} action="">
        <label htmlFor="">Add a Lyric</label>
        <input
          type="text"
          onChange={event => this.setState({ content: event.target.value })}
          value={this.state.content}
        />
      </form>
    );
  }
}

const mutation = gql`
  mutation addLyric($songId: ID!, $content: String!) {
    addLyricToSong(songId: $songId, content: $content) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);
