'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Loading from '../../../app/components/loading';

export default function EsqueciSenha() {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const router = useRouter();

  const solicitar = async () => {
    if (!email) {
      setErro('Por favor, preencha o campo de e-mail.');
      setMensagem('');
      return;
    }

    setCarregando(true);
    try {
      const resposta = await axios.post('http://localhost:5000/clientes/recuperar-senha', {
        email,
      });

      setMensagem(resposta.data.mensagem || 'Verifique seu e-mail para redefinir a senha.');
      setErro('');

      setTimeout(() => {
        router.push('/login');
      }, 2000);

    } catch (err) {
      setErro(err.response?.data?.erro || 'Erro ao enviar o link de recuperação.');
      setMensagem('');
    } finally {
      setCarregando(false);
    }
  };

  if (carregando) return <Loading />;

  return (
    <>
      <div style={{ maxWidth: 400, margin: '50px auto', padding: 20, textAlign: 'center', border: '1px solid #ccc', borderRadius: 10 }}>
        <h2>Esqueci minha senha</h2>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ padding: 10, width: '100%', marginBottom: 10 }}
        />
        <br />
        <button onClick={solicitar} style={{ padding: '10px 20px' }}>
          Enviar link de recuperação
        </button>
        {erro && <p style={{ marginTop: 20, color: 'red' }}>{erro}</p>}
        {mensagem && <p style={{ marginTop: 20, color: 'green' }}>{mensagem}</p>}
      </div>
      </>
  );
}