'use client'

import { useEffect, useState } from "react";
import httpClient from "../../../app/utils/httpClient";
import Link from "next/link";

export default function Cargos() {
    const [lista, setLista] = useState([]);

    function carregarCargos() {
        httpClient.get("/cargos/listar")
            .then(r => r.json())
            .then(setLista)
            .catch(console.error);
    }

    useEffect(() => {
        carregarCargos();
    }, []);

    return (
        <div>
            <h1>Cargos Cadastrados</h1>

            {/* Botão cadastrar */}
            <div>
                <Link href="/admin/cargos/cadastrar" className="btn btn-primary">
                    Cadastrar cargo
                </Link>
            </div>
            <br />

            {/* Tabela */}
            <div>
                {lista.length > 0 ? (
                    <table className="table table-striped text-center">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Descrição</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lista
                                .map(cargo => (
                                    <tr key={cargo.id}>
                                        <td>{cargo.id}</td>
                                        <td>{cargo.descricao}</td>
                                        <td>
                                            <Link
                                                href={`/admin/cargos/alterar/${cargo.id}`}
                                                className="btn btn-primary btn-sm me-1"
                                            >
                                                <i className="fas fa-pen"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Nenhum cargo cadastrado.</p>
                )}
            </div>
        </div>
    );
}