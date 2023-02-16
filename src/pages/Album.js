import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Carregando from './Carregando';

class Album extends React.Component {
  state = {
    musics: [],
  };

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    this.pegaMusicas(id);
  }

  pegaMusicas = async (id) => {
    const musics = await getMusics(id);
    this.setState({ musics });
  };

  render() {
    const { musics } = this.state;
    console.log(musics);
    return (
      <div data-testid="page-album">
        <Header />
        {musics.length > 0
          ? (
            <>
              <p data-testid="artist-name">{musics[0].artistName}</p>
              <p data-testid="album-name">{musics[0].collectionName}</p>
              {musics.filter((x, y) => y > 0).map((x) => (<MusicCard
                key={ x.trackId }
                nameMusic={ x.trackName }
                musicUrl={ x.previewUrl }
                trackId={ x.trackId }
                musica={ x }
              />))}
            </>) : <Carregando />}

      </div>
    );
  }
}

export default Album;
