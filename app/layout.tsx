
import { Metadata } from 'next'
import './globals.css'
import { NextAuthProvider } from '@/components/NextAuthProvider'
import { getSettings } from '@/src/services/settingService'




export async function generateMetadata({ params }: any) {
  var settings = await getSettings();
  return {
    title: {
      template: `%s :: ${settings?.siteTitle}`,
      default: `Home :: ${settings?.siteTitle}`
    },
  }
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
