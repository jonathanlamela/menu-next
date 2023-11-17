
import { Metadata } from 'next'
import './globals.css'
import { NextAuthProvider } from '@/components/NextAuthProvider'



export const metadata: Metadata = {
  title: {
    template: '%s | Menu',
    default: 'Home | Menu'
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NextAuthProvider>
      <html lang="en" className="flex flex-col flex-grow h-full">
        <body className="flex flex-col flex-grow bg-slate-50">
          <div className="container mx-auto flex flex-col flex-grow">
            <div className="shadow-md bg-white flex flex-col flex-grow">
              {children}
            </div>
          </div>
        </body>
      </html>
    </NextAuthProvider>


  )
}
