import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Header from "./component/header/header"
import Footer from "./component/footer/footer"
import Cartprovider from "./context/context"

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
    default: "MyStore | فروشگاه آنلاین",
    template: "%s | MyStore",
  },
  description: "فروشگاه آنلاین MyStore — خرید آنلاین محصولات با بهترین قیمت و ارسال سریع",
  keywords: ["فروشگاه آنلاین", "خرید آنلاین", "MyStore", "فروشگاه اینترنتی"],
  authors: [{ name: "MyStore Team" }],
  creator: "MyStore",
  publisher: "MyStore",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "https://professional-online-shop.vercel.app",
    siteName: "MyStore",
    title: "MyStore | فروشگاه آنلاین",
    description: "خرید آنلاین محصولات با بهترین قیمت و ارسال سریع",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyStore | فروشگاه آنلاین",
    description: "خرید آنلاین محصولات با بهترین قیمت و ارسال سریع",
  },
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Cartprovider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Cartprovider>
      </body>
    </html>
  )
}