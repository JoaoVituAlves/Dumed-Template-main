import express from 'express';
import routerFornecedores from './routes/fornecedorRoute.js';
import routerFuncionarios from './routes/funcionarioRoute.js'; 
import routerCliente from './routes/clienteRoute.js';
import routerCargos from './routes/cargoRoute.js';
import routerTipos from './routes/tipoRoute.js';
import routerCategorias from './routes/categoriaRoute.js'; // <-- Aqui muda o nome da variável para routerCategorias
import routerAutenticacao from './routes/autenticacaoRoute.js';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import { createRequire } from 'module';
import cors from 'cors';

const require = createRequire(import.meta.url);
const outputJson = require('./swagger-output.json');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(outputJson));
app.use('/auth', routerAutenticacao);
app.use('/fornecedores', routerFornecedores);
app.use('/funcionarios', routerFuncionarios);
app.use('/cargos', routerCargos);
app.use('/tipos', routerTipos);
app.use('/categorias', routerCategorias); // <-- E aqui muda a rota para plural também
app.use('/clientes', routerCliente);

app.listen(5000, function () {
    console.log('Servidor web em funcionamento!');
});
