'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  // Se não for usar isClient, pode remover
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      {/* Banner principal */}
      <section className="bg-light py-5 mb-4">
        <div className="container text-center">
          <img src="/logo.png" alt="Logo Dumed" style={{ height: 80 }} className="mb-3" />
          <h1 className="display-5 fw-bold">Bem-vindo à Dumed Hospitalar</h1>
          <p className="lead">Excelência em produtos médicos e hospitalares</p>
          <a href="/vitrine" className="btn btn-primary btn-lg mt-3">Ver Produtos</a>
        </div>
      </section>

      {/* Produtos */}
      <section className="container mb-5">
        <h2 className="mb-4 text-center">Destaques da Semana</h2>
        <div className="row">
          {/* Produto 1 */}
          <Produto
            imagem="/produtos/luva.jpg"
            titulo="Luva Cirúrgica Estéril"
            descricao="Alta proteção e conforto para procedimentos médicos."
            preco="19,90"
          />

          {/* Produto 2 */}
          <Produto
            imagem="/produtos/mascara.jpg"
            titulo="Máscara Cirúrgica Tripla"
            descricao="Filtragem eficiente com conforto respiratório."
            preco="14,90"
          />

          {/* Produto 3 */}
          <Produto
            imagem="/produtos/alcool.jpg"
            titulo="Álcool Gel 70%"
            descricao="Ideal para higienização rápida e eficaz das mãos."
            preco="7,90"
          />
        </div>
      </section>
    </div>
  );
}

// Componente separado para produto
function Produto({ imagem, titulo, descricao, preco }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <img src={imagem} className="card-img-top" alt={titulo} />
        <div className="card-body">
          <h5 className="card-title">{titulo}</h5>
          <p className="card-text">{descricao}</p>
        </div>
        <div className="card-footer d-flex justify-content-between align-items-center">
          <span className="fw-bold text-primary">R$ {preco}</span>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-primary btn-sm">
              <i className="fas fa-cart-plus"></i> Adicionar
            </button>
            <button className="btn btn-outline-danger btn-sm">
              <i className="fas fa-heart"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
