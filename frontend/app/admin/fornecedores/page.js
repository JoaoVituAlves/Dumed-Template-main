'use client'

import httpClient from "../../../app/utils/httpClient";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Fornecedores() {
    const [lista, setLista] = useState([]);
    const [ordemNome, setOrdemNome] = useState('');
    const [filtroCNPJ, setFiltroCNPJ] = useState('');
    const [filtroNome, setfiltroNome] = useState('');

    const formatarCNPJ = (cnpj) => {
        cnpj = cnpj.replace(/\D/g, '');
        if (cnpj.length <= 2) return cnpj;
        if (cnpj.length <= 5) return `${cnpj.slice(0, 2)}.${cnpj.slice(2)}`;
        if (cnpj.length <= 8) return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5)}`;
        if (cnpj.length <= 12) return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8)}`;
        return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8, 12)}-${cnpj.slice(12, 14)}`;
    };
    
    async function excluirFornecedor(id) {
        const confirmacao = window.confirm("Tem certeza que deseja excluir este fornecedor?");
        
        if (!confirmacao) {
            return; 
        }
    
        try {
            const resposta = await httpClient.delete(`/fornecedores/deletar/${id}`);
            const dados = await resposta.json();
            alert(dados.msg);
            carregarFornecedores();
        } catch (erro) {
            console.error("Erro ao excluir fornecedor:", erro);
        }
    }
    

    function carregarFornecedores() {

        httpClient.get("/fornecedores/listar")
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
        carregarFornecedores();
    }, []);

    // Limpar filtros
    const limparFiltros = () => {
        setOrdemNome('');
        setFiltroCNPJ('');
        setfiltroNome('');
    };

     // Função para lidar com o campo de CNPJ
    const handleCNPJChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = formatarCNPJ(value);
        setFiltroCNPJ(value);
    };
    

    return (
        <div>
            <h1>Fornecedores Cadastrados</h1>

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

                    <div className="col-md-3" >
                        <div className="d-flex align-items-center gap-2">
                            <label className="form-label m-0" style={{ whiteSpace: 'nowrap' }}>
                            Buscar por Nome:
                            </label>
                            <input 
                            type="text"
                            className="form-control"
                            value={filtroNome}
                            onChange={(e) => setfiltroNome(e.target.value)}
                            maxLength="100"
                            inputMode="text"
                            />
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="d-flex align-items-center gap-2">
                            <label className="form-label m-0" style={{ whiteSpace: 'nowrap' }}>
                            Buscar por CNPJ:
                            </label>
                            <input 
                            type="text"
                            className="form-control"
                            placeholder="00.000.000/0000-00"
                            value={filtroCNPJ}
                            onChange={handleCNPJChange}
                            maxLength="18"
                            inputMode="numeric"
                            />
                        </div>
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

            {/* Tabela de fornecedores */}
            <div>
                <Link href="/admin/fornecedores/cadastrar" className="btn btn-primary">
                    Cadastrar fornecedor
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
                                <th>CNPJ</th>
                                <th>Telefone</th>
                                <th>Email</th>
                                <th>Endereço</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lista
                            .filter(f => {
                                const nomeOk = filtroNome === '' || f.razao_social.toLowerCase().includes(filtroNome.toLowerCase());
                            
                                const cnpjOk = filtroCNPJ === '' || (f.cnpj && formatarCNPJ(f.cnpj).includes(filtroCNPJ));
                            
                                return nomeOk && cnpjOk;
                            })      
                            .sort((a, b) => {
                                if (ordemNome === 'asc') return a.razao_social.localeCompare(b.razao_social);
                                if (ordemNome === 'desc') return b.razao_social.localeCompare(a.razao_social);
                                return 0;
                            })                      
                            .map((fornecedor) => (
                                <tr key={fornecedor.id}>
                                    <td>{fornecedor.id}</td>
                                    <td>{fornecedor.razao_social}</td>
                                    <td>{fornecedor.cnpj}</td>
                                    <td>{fornecedor.telefone}</td>
                                    <td>{fornecedor.email}</td>
                                    <td>{`${fornecedor.rua}, ${fornecedor.numero}`}</td>
                                    <td>
                                        <Link
                                            href={`/admin/fornecedores/obter/${fornecedor.id}`}
                                            className="btn btn-info btn-sm me-1"
                                            style={{ marginRight: "5px" }}
                                        >
                                            <i className="fas fa-eye"></i>
                                        </Link>
                                        <Link   
                                            href={`/admin/fornecedores/alterar/${fornecedor.id}`}
                                            className="btn btn-primary btn-sm me-1"
                                            style={{ marginRight: "5px" }}
                                        >
                                            <i className="fas fa-pen"></i>
                                        </Link>
                                        <button
                                            onClick={() => excluirFornecedor(fornecedor.id)}
                                            className="btn btn-danger btn-sm me-1"
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Nenhum fornecedor cadastrado.</p>
                )}
            </div>
        </div>
    );
}