import React, { Component } from "react";
import { Row } from "react-bootstrap";
import Casilla from "./Casilla";

export default class Tablero extends Component {

    render() {
        const casillas =  this.props.tablero.map(
            (value, index) => (
                <Casilla 
                    key={index} 
                    position={index} 
                    value={value} 
                    jugador={this.props.jugador} 
                    ganador={this.props.ganador}
                    togglePlayer={this.props.togglePlayer} 
                    handleClick={this.props.handleClick} 
                />
            )
        );
        return (
        <React.Fragment>
            <Row className="tablero">
                {casillas}
            </Row>
        </React.Fragment>
        );
  }
}
