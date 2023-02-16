import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';

class Search extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    inputSearch: '',
    musicas: [],
    mensagemCarregando: false,
    nomeArtistico: '',
  };

  handleChange({ target }) {
    const { value } = target;
    this.setState({
      inputSearch: value,
    });
  }

  Click = async () => {
    const { inputSearch } = this.state;
    this.setState({ mensagemCarregando: true, nomeArtistico: inputSearch });
    const fetchMusicas = await searchAlbumsAPI(inputSearch);
    this.setState({
      inputSearch: '',
      musicas: fetchMusicas,
      mensagemCarregando: false,
    });
    console.log(searchAlbumsAPI);
  };

  condicao = () => {
    const { inputSearch } = this.state;
    const numero = 2;
    if (inputSearch.length < numero) {
      return true;
    }
  };

  render() {
    const { inputSearch, mensagemCarregando, musicas, nomeArtistico } = this.state;
    return (
      <div data-testid="page-search">
        {
          mensagemCarregando
            ? (<Carregando />)
            : (
              <>
                <input
                  type="text"
                  placeholder="Nome do Artista/Banda"
                  data-testid="search-artist-input"
                  onChange={ this.handleChange }
                  name="inputSearch"
                  value={ inputSearch }
                />
                <button
                  type="button"
                  data-testid="search-artist-button"
                  disabled={ this.condicao() }
                  onClick={ this.Click }
                >
                  Pesquisar
                </button>
              </>
            )
        }
        <Header />
        {
          musicas.length === 0
            ? (<p>Nenhum álbum foi encontrado</p>)
            : (
              <section>
                Resultado de álbuns de:
                {' '}
                {nomeArtistico}
                {musicas
                  .map((
                    x,
                  ) => (
                    <div key={ x.collectionId }>
                      <img src={ `${x.artworkUrl100}` } alt={ `${x.collectionName}` } />
                      <p>{x.collectionName}</p>
                      <p>{x.artistName}</p>
                      <p>{x.collectionPrice}</p>
                      <p>{x.releaseDate}</p>
                      <p>{x.trackCount}</p>
                      <Link
                        to={ `/album/${x.collectionId}` }
                        data-testid={ `link-to-album-${x.collectionId}` }
                      >
                        informações
                      </Link>
                    </div>
                  ))}
              </section>
            )
        }
      </div>
    );
  }
}

export default Search;
