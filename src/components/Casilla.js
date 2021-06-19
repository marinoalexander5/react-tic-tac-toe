import React, { Component } from "react";
import { Button } from "react-bootstrap";


// mas simple usando hooks y un componente funcional, pero intente evitarlos como ejercicio
export default class Casilla extends Component {
  render() {    
    // Anulo casilla una vez que tiene valor asignado o ya se encontró un ganador
    const disabled = (this.props.value !== '' || this.props.ganador !== '');

    return (
        <Button 
            variant="dark" 
            className="casilla" 
            disabled={disabled} 
            onClick={() => {
                this.props.handleClick(this.props.position, this.props.jugador); 
                this.props.togglePlayer(); 
                }}>
            {this.props.value}
        </Button>
    );
  }
}
