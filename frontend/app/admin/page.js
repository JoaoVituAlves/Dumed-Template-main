'use client'

import GraficoContratos from "./grafico"
import Link from "next/link"

export default function AdminHome() {
    return (
        <div className="container-fluid">

            <h1 className="h3 mb-4 text-gray-800">Dashboard</h1>

            <div className="row">

                {/* Card 1 - Imóveis */}
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Imóveis
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">24</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-building fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 2 - Fornecedores */}
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-success shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                        Fornecedores
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">10</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-truck fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 3 - Contratos */}
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-info shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                        Contratos
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">15</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-file-contract fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 4 - Último login */}
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-warning shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                        Último Acesso
                                    </div>
                                    <div className="h6 mb-0 font-weight-bold text-gray-800">09/04/2025 às 14:30</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-clock fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="alert alert-info" role="alert">
                <i className="fas fa-info-circle"></i> 3 contratos vencem essa semana. <Link href="/admin/contratos">Ver agora</Link>.
            </div>

            {/* Últimos Contratos */}
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Últimos Contratos</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Cliente</th>
                                    <th>Imóvel</th>
                                    <th>Data</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>#1024</td>
                                    <td>João Silva</td>
                                    <td>Apartamento - Centro</td>
                                    <td>08/04/2025</td>
                                    <td><span className="badge bg-success text-white">Ativo</span></td>
                                    <td>
                                        <a href="#" className="btn btn-sm btn-info"><i className="fas fa-eye"></i></a>
                                        <a href="#" className="btn btn-sm btn-warning mx-1"><i className="fas fa-edit"></i></a>
                                        <a href="#" className="btn btn-sm btn-danger"><i className="fas fa-trash"></i></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>#1023</td>
                                    <td>Maria Souza</td>
                                    <td>Casa - Jardim das Flores</td>
                                    <td>07/04/2025</td>
                                    <td><span className="badge bg-secondary text-white">Finalizado</span></td>
                                    <td>
                                        <a href="#" className="btn btn-sm btn-info"><i className="fas fa-eye"></i></a>
                                        <a href="#" className="btn btn-sm btn-warning mx-1"><i className="fas fa-edit"></i></a>
                                        <a href="#" className="btn btn-sm btn-danger"><i className="fas fa-trash"></i></a>
                                    </td>
                                </tr>
                                {/* + registros aqui */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* KPIs */}
            <div className="row">...</div>
            {/* Gráfico */}
            <GraficoContratos />
            {/* Tabela */}
            <div className="row">...</div>

        </div>

    )
}
