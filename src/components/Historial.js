import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";

export default class Historial extends Component {

  render() {
    const historial = this.props.historial // objeto que contiene "jugador, contador y tablero" de cada turno
    const jugadas = historial.map(
      (item, numero) => {
        return (
          <ListGroup.Item action onClick={() => this.props.handleHistorial(item, numero)} key={numero}>Jugada # {numero + 1 }</ListGroup.Item>
        )
      }
    )

    return (
      <ListGroup defaultActiveKey="#active">
        {jugadas}
      </ListGroup>
    );
  }
}
