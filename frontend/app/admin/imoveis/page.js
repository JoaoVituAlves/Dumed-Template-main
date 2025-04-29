'use client'

import httpClient from "../../../app/utils/httpClient";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Imoveis() {

    const[lista, setLista] = useState([]);


    function excluirImovel(id) {

        httpClient.delete("/imovel/" + id)
        .then(r=> {
            return r.json();
        })
        .then(r=> {
            alert(r.msg);
            carregarImoveis();
        })
        .catch(e => {
            console.error(e);
        })
    }

    function carregarImoveis() {

        
        httpClient.get("/imovel")
        .then(r=> {
            return r.json();
        })
        .then(r=> {
            console.log(r);
            setLista(r);
        })
        .catch(e => {
            console.error(e);
        })
    }

    useEffect(() => {
        carregarImoveis();
    }, [])

    return (
        <div>
            <h1>Imóveis</h1>
            <div>
                <Link href="/admin/imoveis/cadastrar" className="btn btn-primary">Cadastrar imovel</Link>
            </div>
            <br></br>
            <div>
                {
                    lista.length > 0 ?
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Descrição</th>
                                <th>CEP</th>
                                <th>Endereço</th>
                                <th>Bairro</th>
                                <th>Cidade</th>
                                <th>Disponível</th>
                                <th>Valor</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                lista.map((value, index) => {
                                    return <tr key={index}>
                                            <td>{value.id}</td>
                                            <td>{value.descricao}</td>
                                            <td>{value.cep}</td>
                                            <td>{value.endereco}</td>
                                            <td>{value.bairro}</td>
                                            <td>{value.cidade}</td>
                                            <td>{value.disponivel}</td>
                                            <td>R$ {value.valor}</td>
                                            <td>
                                                <Link href={"/admin/imoveis/alterar/" + value.id} style={{marginRight: '5px'}} className="btn btn-primary"><i className="fas fa-pen"></i></Link>
                                                <button onClick={() => excluirImovel(value.id)} className="btn btn-danger"><i className="fas fa-trash"></i></button>
                                            </td>
                                        </tr>
                                })
                            }
                        </tbody>
                    </table>
                    :
                    <></>
                }
            </div>
        </div>
    )
}