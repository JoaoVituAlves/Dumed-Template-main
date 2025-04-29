'use client'

import { useContext, useState, useEffect } from "react"
import UserContext from "../context/userContext";
import httpClient from "../utils/httpClient";
import Link from "next/link";


export default function Locatario() {

    const [listaAluguel, setListaAluguel] = useState([]);

    const {user} = useContext(UserContext);

    function carregarAluguel() {

        httpClient.get("/aluguel/lista/" + user.id)
        .then(r=> {
            return r.json();
        })
        .then(r=> {
            console.log(r);
            setListaAluguel(r);
        })
        .catch(e => {
            console.error(e);
        })
    }

    useEffect(() => {
        carregarAluguel();
    },[])

    return (
        <div className="card card-body" style={{margin: '20px'}}>
            <h1>Área do locatário</h1>
            <hr></hr>
            <div>
                Olá {user.nome}, confira abaixo as parcelas dos imóveis que você locou:
            </div>

            {
                listaAluguel.length > 0 ?
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Contrato</th>
                            <th>Mês</th>
                            <th>Valor</th>
                            <th>Vencimento</th>
                            <th>Pago</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listaAluguel.map((value, index) => {
                                return <tr key={index}>
                                            <td>{value.contrato.id}</td>
                                            <td>{value.mes}</td>
                                            <td>R$ {value.valor}</td>
                                            <td>{new Date(value.vencimento).toLocaleDateString()}</td>
                                            <td>{value.pago}</td>
                                            <td><Link href={"http://localhost:5000/pagamento/checkout/" + value.id} className="btn btn-secondary">Pagar</Link></td>
                                        </tr>
                            })
                        }
                    </tbody>
                </table>
                :
                <></>
            }
        </div>
    )
}