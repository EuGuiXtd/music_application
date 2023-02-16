import React from 'react';
import Carregando from '../pages/Carregando';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    mensagemCarregando: false,
    check: false,
  };

  Click = async () => {
    const { check } = this.state;
    const { musica } = this.props;
    this.setState({ mensagemCarregando: true });
    await addSong(musica);
    this.setState({ mensagemCarregando: false, check: !check });
  };

  render() {
    const { nameMusic, musicUrl, trackId } = this.props;
    const { mensagemCarregando, check } = this.state;
    console.log(check);

    return (
      <div>
        <p>{nameMusic}</p>
        <audio data-testid="audio-component" src={ musicUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        {mensagemCarregando ? (
          <Carregando />
        ) : (

          <label htmlFor="id1">
            Favorita
            <input
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              id="id1"
              onChange={ this.Click }
              checked={ check }
            />
          </label>
        )}
      </div>
    );
  }
}

export default MusicCard;
