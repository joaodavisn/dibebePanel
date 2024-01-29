import { Inter } from "next/font/google";
import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Retaguarda diBebê",
  description: "Gerenciamento de produtos, alugueis e pedidos da loja diBebê",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
