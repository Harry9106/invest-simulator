import React from 'react';
import {Table} from "react-bootstrap";
import "./InfoPublicInvestments.css";

const InfoPublicInvestments = ({investment}) => {
    if(Object.keys(investment).length === 0) {
        return(
            <div className="InfoPublicInvestments">
            <h2 align="center">No hay transacciones disponibles</h2>
            </div>
        );
    } else {
        return (
          <div className="InfoPublicInvestments">
            <h1 align="center">Transacciones Publicas</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th scope="col">Jugador</th>
                  <th scope="col">Posicion</th>
                  <th scope="col">Nombre Activo</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Precio Venta Pasado</th>
                  <th scope="col">Precio Venta Actual</th>
                </tr>
              </thead>
              <tbody>
                {investment.map((invs) =>
                    <tr key={"row" + invs.purchased_on}>
                        <td>{invs.user__username}</td>
                        <td>{invs.user__rank}</td>
                        <td>{invs.asset__name}</td>
                        <td>{new Intl.DateTimeFormat('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit',
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric'
                        }).format(new Date(invs.purchased_on))}
                        </td>
                        <td>{(invs.amount>0)
                                ? invs.amount

                                : (invs.amount*(-1))
                            }
                        </td>
                        <td>${invs.old_sell.toFixed(2)}</td>
                        <td>${invs.asset__sell.toFixed(2)}</td>
                    </tr>
                    )}
              </tbody>
            </Table>
          </div>
        );
    }
}

export default InfoPublicInvestments;