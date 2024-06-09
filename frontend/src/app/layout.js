import { Toaster, toast } from "sonner";
import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import {SocketProvider} from "@/context/SocketContext";
export const metadata = {
  title: "EntrepNet",
  description: "A platform for enterpreneurs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-[#183678]  to-[#183678]">
        <Toaster />
        <SocketProvider>
            <AuthContextProvider>
                {children}
            </AuthContextProvider>
        </SocketProvider>
      </body>
    </html>
  );
}
