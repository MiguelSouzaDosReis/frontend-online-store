import React, { Component } from 'react';

class ClientsData extends Component {
  render() {
    return (
      <div className="clients-Data">
        <h3>
          Informações do Comprador
        </h3>
        <form className="clients-data-form">
          <label htmlFor="name-input">
            <input
              data-testid="checkout-fullname"
              id="name-input"
              type="text"
              placeholder="Nome Completo"
              size="43.8"
            />
          </label>
          <label htmlFor="email-input">
            <input
              data-testid="checkout-email"
              id="email-input"
              type="email"
              placeholder="E-mail"
              size="30"
            />
          </label>
          <label htmlFor="cpf-input">
            <input
              data-testid="checkout-cpf"
              id="cpf-input"
              type="text"
              maxLength="11"
              placeholder="CPF"
              size="14"
            />
          </label>
          <label htmlFor="phone-input">
            <input
              data-testid="checkout-phone"
              id="phone-input"
              type="text"
              maxLength="12"
              placeholder="Telefone"
            />
          </label>
          <label htmlFor="cep-input">
            <input
              data-testid="checkout-cep"
              id="cep-input"
              type="text"
              maxLength="8"
              placeholder="CEP"
            />
          </label>
          <label htmlFor="adress-input">
            <input
              data-testid="checkout-address"
              id="adress-input"
              type="text"
              placeholder="Endereço"
              size="47"
            />
          </label>
          <label htmlFor="numero-input">
            <input
              id="numero-input"
              type="number"
              placeholder="Numero"
            />
          </label>
          <label htmlFor="complemento-input">
            <input
              id="complemento-input"
              type="text"
              placeholder="Complemento"
            />
          </label>
          <label htmlFor="cidade-input">
            <input
              id="cidade-input"
              type="text"
              placeholder="Cidade"
            />
          </label>
          <select name="estados-brasil">
            <option value="AC">Acre</option>
            <option value="AL">Alagoas</option>
            <option value="AP">Amapá</option>
            <option value="AM">Amazonas</option>
            <option value="BA">Bahia</option>
            <option value="CE">Ceará</option>
            <option value="DF">Distrito Federal</option>
            <option value="ES">Espírito Santo</option>
            <option value="GO">Goiás</option>
            <option value="MA">Maranhão</option>
            <option value="MT">Mato Grosso</option>
            <option value="MS">Mato Grosso do Sul</option>
            <option value="MG">Minas Gerais</option>
            <option value="PA">Pará</option>
            <option value="PB">Paraíba</option>
            <option value="PR">Paraná</option>
            <option value="PE">Pernambuco</option>
            <option value="PI">Piauí</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="RN">Rio Grande do Norte</option>
            <option value="RS">Rio Grande do Sul</option>
            <option value="RO">Rondônia</option>
            <option value="RR">Roraima</option>
            <option value="SC">Santa Catarina</option>
            <option value="SP">São Paulo</option>
            <option value="SE">Sergipe</option>
            <option value="TO">Tocantins</option>
          </select>
        </form>
      </div>
    );
  }
}

export default ClientsData;
