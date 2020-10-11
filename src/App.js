import React, { Component } from 'react';
//import './App.css';
import Buscador from './Components/Buscador';
import Resultado from './Components/Resultado';

class App extends Component {

  state = {
    buscar: '',
    imagenes : [],
    pagina : ''
  }

  scroll = () => {
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('smooth', 'start');
  }

  datoBusqueda = (termino) => {
    //console.log(termino);
    this.setState({
      buscar: termino,
      pagina: 1
    }, () => {
      this.consultarAPI();
    })
  }

  consultarAPI = () => {
    const urlAPI = 'https://pixabay.com/api/?key=18229168-7b92ee8567df42f200bd0de14&q=' + this.state.buscar + '&image_type=photo&pretty=true&page=' + this.state.pagina;
    console.log(urlAPI);

    fetch(urlAPI).then(respuesta => respuesta.json()).then(resultado => this.setState({imagenes : resultado.hits}));
  }

  paginaAnterior = () => {
    let pagina = this.state.pagina;
    if (pagina == 1) return null;
    pagina--;
    this.setState({
      pagina
    }, () => {
      this.consultarAPI();
      this.scroll();
    });
  }

  paginaSiguiente = () => {
    let pagina = this.state.pagina;
    pagina++;
    this.setState({
      pagina
    }, () => {
      this.consultarAPI();
      this.scroll();
    });
  }

  render() {
    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de imagenes</p>
          <Buscador
            datoBusqueda={this.datoBusqueda} />
        </div>
        <div className="row justify-content-center">
          <Resultado
            imagenes={this.state.imagenes}
            paginaAnterior={this.paginaAnterior}
            paginaSiguiente={this.paginaSiguiente}/>
        </div>
      </div>
    );
  }
}

export default App;
