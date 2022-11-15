import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../pages/Carregando';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  state = {
    nome: '',
    mensagemCarregando: true,
  };

  componentDidMount() {
    this.usuario();
  }

  usuario = async () => {
    const { name } = await getUser();
    this.setState({ mensagemCarregando: false, nome: name });
  };

  render() {
    const { nome, mensagemCarregando } = this.state;
    return (
      <header data-testid="header-component">
        {
          mensagemCarregando
            ? (<Carregando />)
            : (
              <div>
                <p data-testid="header-user-name">{ nome }</p>
                <Link to="/search" data-testid="link-to-search">Search</Link>
                <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
                <Link to="/profile" data-testid="link-to-profile">Profile</Link>

              </div>
            )
        }
      </header>
    );
  }
}
