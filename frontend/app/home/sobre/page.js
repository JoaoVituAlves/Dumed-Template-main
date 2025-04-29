'use client';

import React from 'react';
import './sobre.css';  // Certifique-se de que o caminho do CSS está correto

export default function SobreADumedHospitalar() {
  return (
    <div className="container-sobre">
      <h1>Sobre a Dumed Hospitalar</h1>

      {/* Seção 1: Quem Somos */}
      <section>
        <h2>1. Quem Somos</h2>
        <p>
          A Dumed Hospitalar é uma empresa especializada em fornecer produtos médicos e hospitalares de alta qualidade. Nosso compromisso é oferecer soluções eficientes e acessíveis para instituições de saúde e profissionais da área médica.
        </p>
      </section>

      <hr />

      {/* Seção 2: Missão */}
      <section>
        <h2>2. Missão</h2>
        <p>
          Nossa missão é garantir a qualidade e a segurança dos produtos que oferecemos, sempre com foco no bem-estar dos pacientes e no suporte aos profissionais de saúde.
        </p>
      </section>

      <hr />

      {/* Seção 3: Visão */}
      <section>
        <h2>3. Visão</h2>
        <p>
          Ser referência no mercado de produtos médicos e hospitalares, reconhecida pela excelência no atendimento, pela inovação e pelo compromisso com a saúde de todos.
        </p>
      </section>

      <hr />

      {/* Seção 4: Valores */}
      <section>
        <h2>4. Valores</h2>
        <ul>
          <li><strong>Qualidade:</strong> Buscamos sempre oferecer os melhores produtos do mercado.</li>
          <li><strong>Comprometimento:</strong> Trabalhamos para garantir a satisfação dos nossos clientes e parceiros.</li>
          <li><strong>Inovação:</strong> Estamos sempre em busca de novas soluções para melhorar o atendimento à saúde.</li>
          <li><strong>Responsabilidade:</strong> Priorizamos a segurança e a ética em todas as nossas ações.</li>
        </ul>
      </section>
    </div>
  );
}
