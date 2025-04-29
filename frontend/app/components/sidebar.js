import Link from "next/link";
import Image from 'next/image';

export default function Sidebar() {
    return (
            <ul className="navbar-nav sidebar sidebar-dark accordion" id="accordionSidebar" style={{ backgroundColor: '#003366' }}>

            <Link className="sidebar-brand d-flex align-items-center justify-content-center" href="/admin">
                <div className="sidebar-brand-icon">
                <Image 
                    src="/img/icone_dumed.png" 
                    alt="Ícone Dumed" 
                    width={25}
                    height={25} 
                />
                </div>
                <div className="sidebar-brand-text mx-3">Admin Dumed</div>
            </Link>

            <hr className="sidebar-divider my-0" />

            <li className="nav-item">
                <Link className="nav-link" href="/admin">
                    <i className="fas fa-fw fa-home"></i>
                    <span>Início</span>
                </Link>
            </li>

            <hr className="sidebar-divider" />

            <div className="sidebar-heading">Gerenciamento</div>

            <li className="nav-item">
                <Link className="nav-link" href="/admin/fornecedores">
                    <i className="fas fa-fw fa-truck"></i>
                    <span>Fornecedores</span>
                </Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" href="/admin/funcionarios">
                    <i className="fas fa-fw fa-briefcase"></i>
                    <span>Funcionários</span>
                </Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" href="/admin/clientes">
                    <i className="fas fa-fw fa-user"></i>
                    <span>Clientes</span>
                </Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" href="/admin/cargos">
                    <i className="fas fa-fw fa-laptop"></i>
                    <span>Cargos Funcionário</span>
                </Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" href="/admin/tipos">
                    <i className="fas fa-fw fa-pen"></i>
                    <span>Tipos Funcionário</span>
                </Link>
            </li>

            <hr className="sidebar-divider" />

            <li className="nav-item">
                <Link className="nav-link" href="/home/login/logout">
                    <i className="fas fa-arrow-left"></i>
                    <span> Sair</span>
                </Link>
            </li>
        </ul>
    );
}