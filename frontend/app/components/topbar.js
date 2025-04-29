export default function Topbar() {
    const funcionario = JSON.parse(localStorage.getItem('funcionarioLogado'));
    const nomeFuncionario = funcionario?.nome || 'Funcionário'; // nome ou "Funcionário" padrão

    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 shadow">
            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                <i className="fa fa-bars"></i>
            </button>

            <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown no-arrow">
                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">{nomeFuncionario}</span>
                        <img className="img-profile rounded-circle" src="/img/user.jpg" style={{ width: '30px' }} />
                    </a>
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                        aria-labelledby="userDropdown">
                        <a className="dropdown-item" href="/perfil">
                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                            Ver Perfil
                        </a>
                        <a className="dropdown-item" href="/login/logout" data-toggle="modal" data-target="#logoutModal">
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                            Logout
                        </a>
                    </div>
                </li>
            </ul>
        </nav>
    )
}