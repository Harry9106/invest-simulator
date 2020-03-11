import React from 'react';
import {Table} from "react-bootstrap";
import "./InfoRanking.css";

const InfoRanking = ({ranking, current_username}) => {
    if(ranking == null || ranking.length === 0) {
        return(
            <div className="InfoRanking">
                <section>
                    <h1 align="center">Ranking de usuarios</h1>
                    <p align="center">Cargando..</p>
                </section>
            </div>
        );
    } else {
            return (
              <section className="InfoRanking">
                <h1 align="center">Ranking de usuarios</h1>
                <div>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th scope="col">Posición</th>
                          <th scope="col">Usuario</th>
                          <th scope="col">Cotización de cartera</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ranking.map((rank, index) =>
                            <tr key={"row-rank-" + index} id={(current_username === rank.username) ? 'selected-current-username' : ''} className={(current_username === rank.username) ? 'selected-current-username' : ''}>
                              <td>{rank.rank}</td>
                              <td>{rank.username}</td>
                              <td>${rank.total.toFixed(2)}</td>
                            </tr>
                            )}
                      </tbody>
                    </Table>
                </div>
              </section>
            );
        }
}

export default InfoRanking;