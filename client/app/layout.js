
import "./globals.css";
import "../public/template/css/sb-admin-2.min.css"
import "../public/template/css/fontawesome-free/css/all.min.css"
import { UserProvider } from "./context/userContext";

export const metadata = {
  title: "TrucoFIpp",
  description: "Aplicação Frontend para o TrucoFIpp",
};

export default function RootLayout({ children }) {
  return (
    <UserProvider>
    <html lang="pt-br">
      <body className="cursor">
        {children}

        <script src="/template/js/jquery.min.js"></script>
        <script src="/template/js/bootstrap.bundle.min.js"></script>
        <script src="/template/js/sb-admin-2.min.js"></script>
      </body>
    </html>
    </UserProvider>
  );
}