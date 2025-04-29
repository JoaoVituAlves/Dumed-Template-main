// app/layout.js
import './globals.css';
import '../public/template/css/sb-admin-2.min.css';
import '../public/template/css/fontawesome-free/css/all.min.css';
import { Nunito } from 'next/font/google';
import { UserProvider } from './context/userContext';
import Icone from './components/icone';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'Dumed Hospitalar',
  description: 'Produtos médicos e hospitalares',
};

export default function RootLayout({ children }) {
  return (
    <UserProvider>
      <html lang="pt-br">
        <head><Icone /></head> 
        <body className={nunito.className}>
            
          {/* Conteúdo da página */}
        <main>{children}</main>

          {/* JS do Bootstrap */}
          <script src="/template/js/jquery.min.js"></script>
          <script src="/template/js/bootstrap.bundle.min.js"></script>
          <script src="/template/js/sb-admin-2.min.js"></script>
        </body>
      </html>
    </UserProvider>
  );
}