'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import httpClient from "../../app/utils/httpClient";

export default function DetalhesCliente() {
    const { id } = useParams();
    const [cliente, setCliente] = useState(null);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        async function buscarCliente() {
            try {
                const resposta = await httpClient.get(`/clientes/obter/${id}`);
                const dados = await resposta.json();
                setCliente(dados);
            } catch (err) {
                setErro("Erro ao buscar cliente.");
                console.error(err);
            }
        }

        if (id) {
            buscarCliente();
        }
    }, [id]);

    if (erro) return <p>{erro}</p>;

    if (!cliente) return <p>Carregando...</p>;

    return (
        <div>
            <h1>Detalhes do Cliente</h1>
            <p><strong>ID:</strong> {cliente.id}</p>
            <p><strong>Nome:</strong> {cliente.nome}</p>
            <p><strong>Documento:</strong> {cliente.tipo === 1 ? cliente.cpf : cliente.cnpj}</p>
            <p><strong>Telefone:</strong> {cliente.telefone}</p>
            <p><strong>Email:</strong> {cliente.email}</p>
            <p><strong>Tipo:</strong> {cliente.tipo === 1 ? "Física" : "Jurídica"}</p>
        </div>
    );
}
