'use client'

import { useEffect, useState } from "react";
import httpClient from "../../../app/utils/httpClient";
import Link from "next/link";

export default function Tipos() {
    const [lista, setLista] = useState([]);

    function carregarTipos() {
        httpClient.get("/tipos/listar")
            .then(r => r.json())
            .then(setLista)
            .catch(console.error);
    }

    useEffect(() => {
        carregarTipos();
    }, []);

    return (
        <div>
            <h1>Tipos Cadastrados</h1>

            {/* Botão cadastrar */}
            <div>
                <Link href="/admin/tipos/cadastrar" className="btn btn-primary">
                    Cadastrar tipo
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
                                .map(tipo => (
                                    <tr key={tipo.id}>
                                        <td>{tipo.id}</td>
                                        <td>{tipo.descricao}</td>
                                        <td>
                                            <Link
                                                href={`/admin/tipos/alterar/${tipo.id}`}
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
                    <p>Nenhum tipo cadastrado.</p>
                )}
            </div>
        </div>
    );
}