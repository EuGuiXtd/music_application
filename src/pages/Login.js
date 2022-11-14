import React from 'react';
import { PropTypes } from 'prop-types';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    nome: '',
    mensagemCarregando: false,
  };

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  Click = async () => {
    this.setState({ mensagemCarregando: true });
    const { nome: nomeArtistico } = this.state;
    const { history } = this.props;
    await createUser({ name: nomeArtistico });
    history.push('./search');
  };

  condicao = () => {
    const { nome: nomeArtistico } = this.state;
    const numero = 3;
    if (nomeArtistico.length < numero) {
      return true;
    }
  };

  render() {
    const { mensagemCarregando } = this.state;
    return (
      <div data-testid="page-login">
        {mensagemCarregando
          ? <Carregando />
          : (
            <>
              <input
                name="nome"
                data-testid="login-name-input"
                type="text"
                placeholder="Nome"
                onChange={ this.handleChange }
              />
              <button
                type="button"
                data-testid="login-submit-button"
                disabled={ this.condicao() }
                onClick={ this.Click }
              >
                Entrar
              </button>
            </>
          )}
      </div>
    );
  }
}
Login.propTypes = {
  history: PropTypes.string,
}.isRequired;

export default Login;
