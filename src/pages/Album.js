import React from 'react';
import Header from '../components/Header';
/* import getMusics from '../services/musicsAPI'; */

class Album extends React.Component {
  render() {
    return (
      <div data-testid="page-album">
        {' '}
        <Header />
      </div>
    );
  }
}
/* const number = 1434371867;
console.log(getMusics(number)); */

export default Album;
