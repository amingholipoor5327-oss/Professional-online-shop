import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css" 
import Sidebar from "./component/Sidebar/Sidebar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata = {
  title: {
    default: "MyStore Admin Panel",
    template: "%s | MyStore",
  },
  description: "MyStore Admin Panel — Manage products, orders, and users",
  keywords: ["MyStore", "Admin", "Panel", "E-commerce", "Management"],
  authors: [{ name: "MyStore" }],
  creator: "MyStore",
  publisher: "MyStore",
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: "/images/images.png",
  },
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="fa"
      dir="ltr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
           <Sidebar />
          <main className="main-content">{children}</main>
       </body>
    </html>
  )
}