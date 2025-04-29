'use client'

import { useEffect, useState } from "react";
import httpClient from "../../../app/utils/httpClient";
import Link from "next/link";
import { exportarParaExcel, exportarParaPDF } from "../../../app/utils/exportador";

export default function Clientes() {
    const [lista, setLista] = useState([]);
    const [ordemNome, setOrdemNome] = useState('');
    const [filtroDocumento, setFiltroDocumento] = useState('');
    const [tipoDocumento, setTipoDocumento] = useState('cpf');
    const [filtroTipoPessoa, setFiltroTipoPessoa] = useState('');

    const formatarCPF = (cpf) => {
        cpf = cpf.replace(/\D/g, '');
        if (cpf.length <= 3) return cpf;
        if (cpf.length <= 6) return `${cpf.slice(0, 3)}.${cpf.slice(3)}`;
        if (cpf.length <= 9) return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6)}`;
        return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9, 11)}`;
    };

    const formatarCNPJ = (cnpj) => {
        cnpj = cnpj.replace(/\D/g, '');
        if (cnpj.length <= 2) return cnpj;
        if (cnpj.length <= 5) return `${cnpj.slice(0, 2)}.${cnpj.slice(2)}`;
        if (cnpj.length <= 8) return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5)}`;
        if (cnpj.length <= 12) return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8)}`;
        return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8, 12)}-${cnpj.slice(12, 14)}`;
    };

    function carregarClientes() {
        httpClient.get("/clientes/listar")
            .then(r => r.json())
            .then(setLista)
            .catch(console.error);
    }

    useEffect(() => {
        carregarClientes();
    }, []);

    const limparFiltros = () => {
        setOrdemNome('');
        setFiltroDocumento('');
        setTipoDocumento('cpf');
        setFiltroTipoPessoa('');
    };

    const handleDocumentoChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (tipoDocumento === 'cpf') {
            value = formatarCPF(value);
        } else {
            value = formatarCNPJ(value);
        }
        setFiltroDocumento(value);
    };

    function handleExportarExcel() {
        const dados = lista.map(c => ({
            ID: c.id,
            Nome: c.nome,
            Documento: c.tipo === 1 ? formatarCPF(c.cpf) : formatarCNPJ(c.cnpj),
            Telefone: c.telefone,
            Email: c.email,
            Tipo: c.tipo === 1 ? "Física" : "Jurídica"
        }));

        exportarParaExcel(dados, "clientes");
    }

    function handleExportarPDF() {
        const dados = lista.map(c => [
            c.id,
            c.nome,
            c.tipo === 1 ? formatarCPF(c.cpf) : formatarCNPJ(c.cnpj),
            c.telefone,
            c.email,
            c.tipo === 1 ? "Física" : "Jurídica"
        ]);

        const colunas = ["ID", "Nome", "Documento", "Telefone", "Email", "Tipo"];

        exportarParaPDF(dados, colunas, "clientes");
    }

    return (
        <div>
            <h1>Clientes Cadastrados</h1>

            {/* Filtros */}
            <div className="mb-4">
                <div className="row align-items-end g-2">
                    <div className="col-md-3">
                        <label className="form-label" style={{marginRight: '5px'}}>Ordenar por Nome</label>
                        <select className="form-select" onChange={(e) => setOrdemNome(e.target.value)} value={ordemNome}>
                            <option value="">Selecione</option>
                            <option value="asc">A-Z</option>
                            <option value="desc">Z-A</option>
                        </select>
                    </div>

                    <div className="col-md-3">
                        <label className="form-label" style={{marginRight: '5px'}}>Tipo de Documento</label>
                        <select className="form-select" value={tipoDocumento} onChange={(e) => {
                            setTipoDocumento(e.target.value);
                            setFiltroDocumento('');
                        }}>
                            <option value="cpf">CPF</option>
                            <option value="cnpj">CNPJ</option>
                        </select>
                    </div>

                    <div className="col-md-3" style={{marginLeft: '-100px'}}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder={tipoDocumento === 'cpf' ? '000.000.000-00' : '00.000.000/0000-00'}
                            value={filtroDocumento}
                            onChange={handleDocumentoChange}
                            maxLength={tipoDocumento === 'cpf' ? 14 : 18}
                            inputMode="numeric"        
                        />
                    </div>

                    <div className="col-md-2">
                        <label className="form-label" style={{marginRight: '5px'}}>Tipo de Pessoa</label>
                        <select className="form-select" value={filtroTipoPessoa} onChange={(e) => setFiltroTipoPessoa(e.target.value)}>
                            <option value="">Todos</option>
                            <option value="1">Física</option>
                            <option value="2">Jurídica</option>
                        </select>
                    </div>

                    <div className="col-md-1 d-flex align-items-end">
                        <button className="btn btn-secondary btn-sm w-100" onClick={limparFiltros}>
                            Limpar
                        </button>
                    </div>
                </div>
            </div>

            {/* Botão cadastrar */}
            <div>
                <Link href="/admin/clientes/cadastrar" className="btn btn-primary">
                    Cadastrar cliente
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
                                <th>Nome</th>
                                <th>Documento</th>
                                <th>Telefone</th>
                                <th>Email</th>
                                <th>Tipo</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lista
                                .filter(c => {
                                    const doc = c.tipo === 1 ? formatarCPF(c.cpf) : formatarCNPJ(c.cnpj);
                                    const docOk = filtroDocumento === '' || doc.includes(filtroDocumento);
                                    const tipoOk = filtroTipoPessoa === '' || String(c.tipo) === filtroTipoPessoa;
                                    return docOk && tipoOk;
                                })
                                .sort((a, b) => {
                                    if (ordemNome === 'asc') return a.nome.localeCompare(b.nome);
                                    if (ordemNome === 'desc') return b.nome.localeCompare(a.nome);
                                    return 0;
                                })
                                .map(cliente => (
                                    <tr key={cliente.id}>
                                        <td>{cliente.id}</td>
                                        <td>{cliente.nome}</td>
                                        <td>{cliente.tipo === 1 ? formatarCPF(cliente.cpf) : formatarCNPJ(cliente.cnpj)}</td>
                                        <td>{cliente.telefone}</td>
                                        <td>{cliente.email}</td>
                                        <td>{cliente.tipo === 1 ? 'Física' : 'Jurídica'}</td>
                                        <td>
                                            <Link
                                                href={`/admin/clientes/obter/${cliente.id}`}
                                                className="btn btn-info btn-sm me-1"
                                                style={{ marginRight: "5px" }}
                                            >
                                                <i className="fas fa-eye"></i>
                                            </Link>
                                            <Link
                                                href={`/admin/clientes/alterar/${cliente.id}`}
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
                    <p>Nenhum cliente cadastrado.</p>
                )}
            </div>

            {/* Exportar */}
            <div className="d-flex justify-content-end gap-2 mt-3">
                <button onClick={handleExportarExcel} className="btn btn-secondary btn-sm" style={{ marginRight: "5px" }}> 
                    <i className="bi bi-file-earmark-excel me-1"></i>
                    Exportar para Excel
                </button>
                <button onClick={handleExportarPDF} className="btn btn-secondary btn-sm">
                    <i className="bi bi-file-earmark-pdf me-1"></i>
                    Exportar para PDF
                </button>
            </div>
        </div>
    );
}