'use client'
import { useState } from 'react';
import httpClient from '../../utils/httpClient';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('cliente');
    const [erro, setErro] = useState('');
    const router = useRouter();

    const formatarCPF = (valor) => {
        return valor
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    };

    const handleCPFChange = (e) => {
        const valor = e.target.value;
        setCpf(formatarCPF(valor));
    };

    const realizarLogin = async (e) => {
        e.preventDefault();
        setErro('');

        try {
            const resposta = await httpClient.post('/auth/token', {
                cpf: cpf || null,
                senha,
                tipoUsuario
            });

            if (resposta.ok) {
                const data = await resposta.json();
                if (tipoUsuario === 'cliente') {
                    router.push('/home');
                } else {
                    router.push('/admin');
                }
            } else {
                const erroData = await resposta.json();
                setErro(erroData.msg || 'Erro ao autenticar');
            }
        } catch (err) {
            console.error('Erro ao logar:', err);
            setErro('Erro ao conectar com o servidor');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Login</h3>

                            {erro && <div className="alert alert-danger">{erro}</div>}

                            <form onSubmit={realizarLogin}>
                                {/* Tipo de usuário */}
                                <div className="mb-3">
                                    <label className="form-label">Tipo de Acesso</label>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            id="tipoCliente"
                                            name="tipoUsuario"
                                            value="cliente"
                                            checked={tipoUsuario === 'cliente'}
                                            onChange={(e) => setTipoUsuario(e.target.value)}
                                        />
                                        <label className="form-check-label" htmlFor="tipoCliente">
                                            Cliente
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            id="tipoFuncionario"
                                            name="tipoUsuario"
                                            value="funcionario"
                                            checked={tipoUsuario === 'funcionario'}
                                            onChange={(e) => setTipoUsuario(e.target.value)}
                                        />
                                        <label className="form-check-label" htmlFor="tipoFuncionario">
                                            Funcionário
                                        </label>
                                    </div>
                                </div>

                                {/* Campo CPF para ambos cliente e funcionário */}
                                <div className="mb-3">
                                    <label className="form-label">CPF</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={cpf}
                                        onChange={handleCPFChange}
                                        placeholder="000.000.000-00"
                                        maxLength="14"
                                        required
                                    />
                                </div>

                                {/* Campo senha */}
                                <div className="mb-3">
                                    <label className="form-label">Senha</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                        required
                                        placeholder="Digite sua senha"
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary w-100">
                                    Entrar
                                </button>

                                <div className="text-center mt-3">
                                    <a
                                        href={
                                            tipoUsuario === 'cliente'
                                                ? '/recuperacaoCliente/esqueciSenha'
                                                : '/recuperacao/esqueciSenha'
                                        }
                                        className="text-decoration-none"
                                    >
                                        Esqueceu a Senha?
                                    </a>
                                </div>

                                {/* Mostrar link para cadastro se for cliente */}
                                {tipoUsuario === 'cliente' && (
                                    <div className="text-center mt-2">
                                        <a href="/clientes/cadastro" className="text-decoration-none">
                                            Não tem conta? Cadastre-se
                                        </a>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}