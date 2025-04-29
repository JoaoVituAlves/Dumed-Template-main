// app/layout.js
import '../globals.css';
import { Nunito } from 'next/font/google';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'Dumed Hospitalar',
  description: 'Produtos médicos e hospitalares com qualidade garantida.',
};

export default function RootLayout({ children }) {
  const anoAtual = new Date().getFullYear();

  return (
    <div className={nunito.className}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container d-flex justify-content-between align-items-center">
          <a className="navbar-brand d-flex align-items-center" href="/home">
            <img src="/logo.png" alt="Dumed" style={{ height: 40, marginRight: 10 }} />
            <span className="fw-bold">Dumed Hospitalar</span>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
        </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
            <li className="nav-item">
                <a className="nav-link" href="/home">Home</a>
              </li>
            
              <li className="nav-item">
                <a className="nav-link" href="/home/sobre">Sobre</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/home/contato">Contato</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/home/login"><i className="fas fa-user"></i> Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/carrinho"><i className="fas fa-shopping-cart"></i></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/favoritos"><i className="fas fa-heart"></i></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main>{children}</main>

      {/* Rodapé */}
      <footer className="bg-dark text-light mt-5 pt-4 pb-2">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>Dumed Hospitalar</h5>
              <p>Produtos médicos e hospitalares com qualidade garantida.</p>
            </div>
            <div className="col-md-4">
              <h5>Links Rápidos</h5>
              <ul className="list-unstyled">
                <li><a className="text-light" href="/home">Início</a></li>
                <li><a className="text-light" href="/home/sobre">Sobre</a></li>
                <li><a className="text-light" href="/home/contato">Contato</a></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5>Políticas</h5>
              <ul className="list-unstyled">
                <li><a className="text-light" href="/home/privacidade">Política de Privacidade</a></li>
                
              </ul>
            </div>
          </div>
          <div className="text-center mt-3">
            <small>&copy; {anoAtual} Dumed Hospitalar. Todos os direitos reservados.</small>
          </div>
        </div>
      </footer>
    </div>
  );
}
