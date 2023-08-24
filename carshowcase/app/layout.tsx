import './globals.css'
import { Footer,Navbar } from '@/components'
import {SearchContextProvider } from "@/context/SearchContext"



export const metadata = {
  title: 'Car Hub',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <html lang="en">
      <body className="relative">
        <Navbar/>
      <SearchContextProvider>
      {children}
      </SearchContextProvider>
      <Footer/></body>
    </html>
    </>
  )
}