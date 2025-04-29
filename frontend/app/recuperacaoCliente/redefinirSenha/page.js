'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'; 
import axios from 'axios';

export default function RedefinirSenha() {
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [tipoMensagem, setTipoMensagem] = useState('');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const router = useRouter();

  const redefinir = async () => {
    if (!novaSenha || !confirmarSenha) {
      setMensagem('Por favor, preencha todos os campos de senha.');
      setTipoMensagem('erro');
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setMensagem('As senhas não coincidem.');
      setTipoMensagem('erro');
      return;
    }

    try {
        const resposta = await axios.post('http://localhost:5000/clientes/redefinir-senha', {
          token,
          novaSenha,
          confmNovaSenha: confirmarSenha
        });
      
        setMensagem(resposta.data.mensagem || 'Senha redefinida com sucesso!');
        setTipoMensagem('sucesso');

        setTimeout(() => {
            router.push('/login');
        }, 2000);

      } catch (err) {
        setMensagem(
          err.response?.data?.erro ||
          err.response?.data?.msg || 
          'Erro ao redefinir a senha.'
        );
        setTipoMensagem('erro');
    }      
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', padding: 20, textAlign: 'center', border: '1px solid #ccc', borderRadius: 10 }}>
      <h2>Redefinir Senha</h2>
      
      <input
        type="password"
        placeholder="Nova senha"
        value={novaSenha}
        onChange={e => setNovaSenha(e.target.value)}
        style={{ padding: 10, width: '100%', marginBottom: 10 }}
      />
      <br />
      <input
        type="password"
        placeholder="Confirmar senha"
        value={confirmarSenha}
        onChange={e => setConfirmarSenha(e.target.value)}
        style={{ padding: 10, width: '100%', marginBottom: 10 }}
      />
      <br />
      <button onClick={redefinir} style={{ padding: '10px 20px' }}>
        Redefinir
      </button>

      {mensagem && (
        <p style={{ marginTop: 20, color: tipoMensagem === 'erro' ? 'red' : 'green' }}>
          {mensagem}
        </p>
      )}
    </div>
  );
}