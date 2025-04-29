import AuthMiddleware from "../middlewares/authMiddleware.js";
import FuncionarioRepository from "../repositories/funcionarioRepository.js";
import ClienteRepository from "../repositories/clienteRepository.js";
import { formatarCPF } from "../utils/funcionarioValidacao.js";

export default class AutenticacaoController {

    async token(req, res) {
        try {
            let { cpf, senha, tipoUsuario } = req.body;

            if (cpf && senha && tipoUsuario) {
                let auth = new AuthMiddleware();

                if (tipoUsuario === "funcionario") {
                    if (cpf) cpf = formatarCPF(cpf);
                    let repo = new FuncionarioRepository();
                    let funcionario = await repo.validarAcesso(cpf, senha);
                    
                    if (funcionario) {
                        let token = auth.gerarToken(funcionario.id, funcionario.nome, funcionario.cpf, funcionario.telefone, funcionario.email, funcionario.id_cargo, "funcionario");

                        res.cookie("token", token, { httpOnly: true });

                        return res.status(200).json({ 
                            token, 
                            funcionario: {
                                id: funcionario.id,
                                nome: funcionario.nome,
                                cpf: funcionario.cpf,
                                telefone: funcionario.telefone,
                                email: funcionario.email,
                                id_cargo: funcionario.id_cargo
                            }
                        });
                    }

                } else if (tipoUsuario === "cliente") {
                    if (cpf) cpf = formatarCPF(cpf);
                    let repo = new ClienteRepository();
                    let cliente = await repo.validarAcesso(cpf, senha);
                    
                    if (cliente) {
                        let token = auth.gerarToken(cliente.id, cliente.nome, cliente.cpf, cliente.telefone, cliente.email, null, "cliente");

                        res.cookie("token", token, { httpOnly: true });

                        return res.status(200).json({ 
                            token, 
                            cliente: {
                                id: cliente.id,
                                nome: cliente.nome,
                                cpf: cliente.cpf,
                                telefone: cliente.telefone,
                                email: cliente.email
                            }
                        });
                    }
                }

                return res.status(404).json({ msg: "Credenciais inválidas!" });

            } else {
                return res.status(400).json({ msg: "As credenciais não foram fornecidas corretamente!" });
            }

        } catch (ex) {
            console.error("Erro na autenticação:", ex);
            return res.status(500).json({ msg: "Erro interno no servidor." });
        }
    }

    logout(req, res) {
        try {
            res.clearCookie("token", { httpOnly: true, secure: true });
            res.status(200).json({ msg: "Logout realizado com sucesso!" });
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
            res.status(500).json({ msg: "Erro interno ao tentar deslogar." });
        }
    }
}