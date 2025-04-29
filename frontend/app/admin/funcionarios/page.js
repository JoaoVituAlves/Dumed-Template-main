'use client'

import { useState, useEffect } from "react";
import httpClient from "../../../app/utils/httpClient";
import Link from "next/link";
import { exportarParaExcel, exportarParaPDF } from "../../../app/utils/exportador";

export default function Funcionarios() {
    const [lista, setLista] = useState([]);
    const [ordemNome, setOrdemNome] = useState('');
    const [filtroCPF, setFiltroCPF] = useState('');
    const [filtroStatus, setFiltroStatus] = useState('');

    // Função para formatar o CPF
    const formatarCPF = (cpf) => {
        cpf = cpf.replace(/\D/g, '');
        if (cpf.length <= 3) return cpf;
        if (cpf.length <= 6) return `${cpf.slice(0, 3)}.${cpf.slice(3)}`;
        if (cpf.length <= 9) return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6)}`;
        return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9, 11)}`;
    };

    // Função para alterar o status do funcionário
    async function alterarStatusFuncionario(id, statusAtual) {
        const acao = statusAtual ? 'inativar' : 'reativar';
        const confirmacao = window.confirm(`Tem certeza que deseja ${acao} este funcionário?`);

        if (!confirmacao) return;

        try {
            const endpoint = statusAtual ? "/funcionarios/inativar" : "/funcionarios/reativar";
            const resposta = await fetch(`http://localhost:5000${endpoint}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ id })
            });
            const dados = await resposta.json();
            alert(dados.msg);
            carregarFuncionarios();
        } catch (erro) {
            console.error("Erro ao alterar status do funcionário:", erro);
        }
    }

    // Função para carregar funcionários
    function carregarFuncionarios() {
        httpClient.get("/funcionarios/listar")
            .then(r => r.json())
            .then(r => {
                setLista(r);
            })
            .catch(e => console.error(e));
    }

    useEffect(() => {
        carregarFuncionarios();
    }, []);

    // Limpar filtros
    const limparFiltros = () => {
        setOrdemNome('');
        setFiltroCPF('');
        setFiltroStatus('');
    };

    // Função para lidar com o campo de CPF
    const handleCPFChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = formatarCPF(value); 
        setFiltroCPF(value); 
    };

    function handleExportarExcel() {
        const dados = lista.map(f => ({
            ID: f.id,
            Nome: f.nome,
            CPF: f.cpf,
            Telefone: f.telefone,
            Email: f.email,
            Cargo: f.cargo,
            Status: f.status ? "Ativo" : "Inativo"
        }));
    
        exportarParaExcel(dados, "funcionarios");
    }
    
    function handleExportarPDF() {
        const dados = lista.map(f => [
            f.id,
            f.nome,
            f.cpf,
            f.telefone,
            f.email,
            f.cargo,
            f.status ? "Ativo" : "Inativo"
        ]);
    
        const colunas = ["ID", "Nome", "CPF", "Telefone", "Email", "Cargo", "Status"];
    
        exportarParaPDF(dados, colunas, "funcionarios");
    }

    return (
        <div>
            <h1>Funcionários Cadastrados</h1>
            
            {/* Filtros */}
            <div className="mb-4">
                <div className="row align-items-end g-2">
                    <div className="col-md-3">
                    <label className="form-label" style={{marginRight: '5px'}}>Ordenar por Nome</label>
                    <select 
                        className="form-select" 
                        onChange={(e) => setOrdemNome(e.target.value)} 
                        value={ordemNome}
                    >
                        <option value="">Selecione</option>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select>
                    </div>
 
                    <div className="col-md-3">
                        <div className="d-flex align-items-center gap-2">
                            <label className="form-label m-0" style={{ whiteSpace: 'nowrap' }}>
                            Buscar por CPF:
                            </label>
                            <input 
                            type="text"
                            className="form-control"
                            placeholder="000.000.000-00"
                            value={filtroCPF}
                            onChange={handleCPFChange}
                            maxLength="14"
                            inputMode="numeric"
                            />
                        </div>
                    </div>

                    <div className="col-md-3">
                    <label className="form-label" style={{marginRight: '5px'}}>Status</label>
                    <select 
                        className="form-select" 
                        onChange={(e) => setFiltroStatus(e.target.value)} 
                        value={filtroStatus}
                    >
                        <option value="">Todos</option>
                        <option value="ativo">Ativo</option>
                        <option value="inativo">Inativo</option>
                    </select>
                    </div>

                    <div className="col-md-3 d-flex align-items-end">
                    <button 
                        className="btn btn-secondary btn-sm w-100" 
                        onClick={limparFiltros}
                    >
                        Limpar Filtros
                    </button>
                    </div>
                </div>
            </div>

            {/* Tabela de funcionários */}
            <div>
                <Link href="/admin/funcionarios/cadastrar" className="btn btn-primary">
                    Cadastrar funcionário
                </Link>
            </div>
            <br />
            <div>
                {lista.length > 0 ? (
                    <table className="table table-striped text-center">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Telefone</th>
                                <th>Email</th>
                                <th>Cargo</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lista
                                .filter(f => {
                                    const cpfFormatado = formatarCPF(filtroCPF);
                                    const cpfOk = filtroCPF === '' || formatarCPF(f.cpf).includes(cpfFormatado);

                                    const statusOk =
                                        filtroStatus === '' ||
                                        (filtroStatus === 'ativo' && f.status) ||
                                        (filtroStatus === 'inativo' && !f.status);
                                    return cpfOk && statusOk;
                                })
                                .sort((a, b) => {
                                    if (ordemNome === 'asc') return a.nome.localeCompare(b.nome);
                                    if (ordemNome === 'desc') return b.nome.localeCompare(a.nome);
                                    return 0;
                                })
                                .map((funcionario) => (
                                    <tr key={funcionario.id}>
                                        <td>{funcionario.id}</td>
                                        <td>{funcionario.nome}</td>
                                        <td>{funcionario.cpf}</td>
                                        <td>{funcionario.telefone}</td>
                                        <td>{funcionario.email}</td>
                                        <td>{funcionario.cargo}</td>
                                        <td>
                                            <span className={`badge ${funcionario.status ? 'bg-success' : 'bg-danger'}`}>
                                                {funcionario.status ? 'Ativo' : 'Inativo'}
                                            </span>
                                        </td>
                                        <td>
                                            <Link
                                                href={`/admin/funcionarios/obter/${funcionario.id}`}
                                                className="btn btn-info btn-sm me-1"
                                                style={{ marginRight: "5px" }}
                                            >
                                                <i className="fas fa-eye"></i>
                                            </Link>
                                            <Link
                                                href={`/admin/funcionarios/alterar/${funcionario.id}`}
                                                className="btn btn-primary btn-sm me-1"
                                                style={{ marginRight: "5px" }}
                                            >
                                                <i className="fas fa-pen"></i>
                                            </Link>
                                            <button
                                                onClick={() => alterarStatusFuncionario(funcionario.id, funcionario.status)}
                                                className={`btn btn-sm ${funcionario.status ? 'btn-danger' : 'btn-success'}`}
                                                style={{ marginRight: "5px" }}
                                            >
                                                <i className={`bi ${funcionario.status ? 'bi-x-circle' : 'bi-arrow-clockwise'} me-1`}></i>
                                                {funcionario.status ? 'Inativar' : 'Reativar'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Nenhum funcionário cadastrado.</p>
                )}
            </div>

            {/* Botões Exportar */}
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