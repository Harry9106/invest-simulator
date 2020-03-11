import React from 'react';
import {Table, Button} from "react-bootstrap";
import "./InfoTransaction.css";

const InfoTransaction = ({investment, handleClick}) => {
    if(Object.keys(investment).length === 0) {
        return(
            <div className="InfoTransaction">
            <h2 align="center">No hay transacciones disponibles</h2>
            </div>
        );
    } else {
        return (
          <div className="InfoTransaction">
            <h1 align="center">Historial Transacciones</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th scope="col">Fecha</th>
                  <th scope="col">Tipo transaccion</th>
                  <th scope="col">Nombre Activo</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Precio Compra</th>
                  <th scope="col">Precio Venta</th>
                  <th scope="col">Visibilidad</th>
                  <th scope="col">Modificar visibilidad</th>
                </tr>
              </thead>
              <tbody>
                {investment.map((invs) =>
                    <tr key={"row"+invs.purchased_on}>
                        <td>{new Intl.DateTimeFormat('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit',
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric'
                        }).format(new Date(invs.purchased_on))}
                        </td>
                        <td>{(invs.type === "BUY") ? "Compra" : "Venta"}</td>
                        <td>{invs.asset__name}</td>
                        <td>{(invs.amount>0)
                                ? invs.amount

                                : (invs.amount*(-1))
                            }
                        </td>
                        <td>${invs.old_buy.toFixed(2)}</td>
                        <td>${invs.old_sell.toFixed(2)}</td>
                        <td>{(invs.visible)
                                ? "Publica"
                                : "Privada"
                            }
                        </td>
                        <td>{(invs.type === "BUY")
                                ? <Button
                                    bsStyle="info"
                                    iid={invs.id}
                                    onClick={handleClick}
                                    >Modificar
                                </Button>
                                : ""
                        }
                        </td>
                    </tr>
                    )}
              </tbody>
            </Table>
          </div>
        );
    }
}

export default InfoTransaction;