
import "./globals.css";
import  Header from "../components/Header";

export const metadata = {
  title: "EntrepNet",
  description: "A platform for enterpreneurs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-[#183678]  to-[#183678]">
        <Header />
        {children}
       </body>
    </html>
  );
}
