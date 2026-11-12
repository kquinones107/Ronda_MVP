import type {Metadata} from "next";import "./globals.css";
export const metadata:Metadata={title:"Ronda · Aprende algo, conoce a alguien",description:"Encuentra encuentros pequeños para compartir habilidades, aprender haciendo y conectar con personas de tu comunidad.",icons:{icon:"/favicon.svg"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><body>{children}</body></html>;}
