import React from 'react';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';
import query from '../queries/fetchSongDetail';

class SongDetail extends React.Component {
  render() {
    const { song } = this.props.data;

    if (!song) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>{song.title}</h3>
        <LyricList lyrics={song.lyrics} />
        <LyricCreate songId={this.props.params.id} />
      </div>
    );
  }
}

graphql(query, {
  options: props => {
    variables: {
      id: props.params.id;
    }
  },
});

export default graphql(query, {
  options: props => {
    return { variables: { id: props.params.id } };
  },
})(SongDetail);
