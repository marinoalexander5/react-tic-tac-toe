import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './Juego.css';
import { Container, Row, Col, Button } from "react-bootstrap";
import Historial from "./components/Historial";
import Tablero from "./components/Tablero";

// Defino estado inicial al momento de resetear
const initialState = {
    tablero: Array(9).fill(""),
    jugador: "X",
    contador: 0,
    ganador: '',
    historial: []
}

class Juego extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.togglePlayer = this.togglePlayer.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.reset = this.reset.bind(this);
    this.handleContador = this.handleContador.bind(this);
    this.buscarGanador = this.buscarGanador.bind(this);
    this.handleHistorial = this.handleHistorial.bind(this);
    this.updateHistorial = this.updateHistorial.bind(this);
  }

  // Cambiar jugador entre X y O
  togglePlayer() {
    this.setState(
      { 
        jugador: (
          this.state.jugador === 'X') ? 'O' : 'X'}
      )
    }

  // Asignar valor a casillero
  handleClick(posicion, jugador) {
    // Crea una copia para evitar modificar el array original
    let tablero = [...this.state.tablero];
    tablero[posicion] = jugador

    // Uso de callback para asegurar que buscarGanador se ejecuta una vez modificado el state del tablero (asincrono)
    this.setState({
      tablero: tablero,
      }, () => {
        this.buscarGanador(); 
        this.handleContador();
        this.updateHistorial();
      }
    )
        
  }

  // Agrego tablero, jugador y contador actual al historial
  updateHistorial(){
    
    let historial = [...this.state.historial];
    historial.push({
      tablero: this.state.tablero,
      jugador: this.state.jugador,
      contador: this.state.contador
    });

    this.setState({
      historial: historial
    })

  }

  // Llamar al estado inicial para volver a comenzar
  reset() {
    this.setState(initialState)
  }
      
  // Manipular contador para verificar fin del juego 
  handleContador() {
    if (this.state.contador < 8) {
      this.setState(
        state => ({
          contador: state.contador + 1
        })
    )
  }}

  buscarGanador(){
    const tablero = this.state.tablero
    // Seria mas eficiente unicamente verificar con el jugador actual, para simplificar elijo este metodo por ahora, corregir en un futuro
    let indicesX = [];
    let indicesO = [];
    let posicionX = tablero.indexOf("X");
    let posicionO = tablero.indexOf("O");

    // Extraigo del tablero donde se encuentran las jugadas de X y O
    while (posicionX !== -1) {
      indicesX.push(posicionX);
      posicionX = tablero.indexOf('X', posicionX + 1);
    }

    while (posicionX !== -1) {
      indicesO.push(posicionO);
      posicionO = tablero.indexOf('O', posicionO + 1);
    }

    const combinacionesGanador = [
      //filas
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      //columnas
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // diagonales
      [0, 4, 8],
      [2, 4, 6],
    ]

    // Verifico si alguna combinacion ganadora se ecuentra presente en los indices para "X" y "O" 
    const ganadorX = combinacionesGanador.map(combinacion =>
      combinacion.every(i => indicesX.includes(i))
    );
    let ganoX = ganadorX.some(Boolean)

    const ganadorO = combinacionesGanador.map(combinacion =>
      combinacion.every(i => indicesO.includes(i))
    )
    let ganoO = ganadorO.some(Boolean)
    
    // Si no hay ganador es empate
    if(ganoX) {
      this.setState({
        ganador: "X"
      })
    } else if(ganoO) {
      this.setState({
        ganador: "O"
      })
    } else if (this.state.contador >= 8) {
      this.setState({
        ganador: 'empate'
      })
    } 
    
  }

  // Mejorar: Probablemente mas eficiente buscar indice de objeto "historial" directamente en lugar de andar pasando todo en props de un lado a otro. 
  handleHistorial(item, numero){  
    const historialPrevio = this.state.historial.slice(0, numero + 1 )

    this.setState({
      tablero: item.tablero,
      jugador: item.jugador,
      contador: item.contador,
      historial: historialPrevio
    })
  }

  render() {
    return (
      <Container>
        <Row className="justify-content-center my-5">
          <h1>Tateti</h1>
        </Row>
        <Row>
          <Col>
            <Tablero 
              jugador={this.state.jugador} 
              tablero={this.state.tablero} 
              ganador={this.state.ganador}
              togglePlayer={this.togglePlayer} 
              handleContador={this.handleContador} 
              handleClick={this.handleClick} 
            />
          </Col>
          <Col>
            <Button variant="info" className="mb-3" onClick={this.reset}>Reiniciar Juego</Button>
            <h3>Es el turno de: {this.state.jugador}</h3>
            <Historial handleHistorial={this.handleHistorial} historial={this.state.historial} />
          </Col>
        </Row>
        <Row className="justify-content-center mt-5">
          <h1>El ganador es: <strong>{this.state.ganador.toUpperCase()}</strong></h1>
        </Row>
      </Container>
    );
  }
}

export default Juego;
