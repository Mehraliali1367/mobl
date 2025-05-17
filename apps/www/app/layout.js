import "../public/css/globals.css";
import Header from "../components/layout/Header";
import Tostify from "../components/lib/Toastify"
import NextNProgress from "../components/lib/NextNProgressBar";
import Footer from "../components/layout/Footer";
import { AuthProvider } from "../context/AuthContext";
import Providers from "../redux/Provider";

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <AuthProvider>
          <Providers>
            <NextNProgress>
              <Header />
              {children}
              <Tostify />
              <Footer />
            </NextNProgress>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
