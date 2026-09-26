import './globals.css'
import { ThemeProvider } from './ThemeProvider'
import { ThemeToggle } from './ThemeToggle'
import { Toaster } from 'sonner'

export const metadata = {
  title: 'Student Dashboard',
  description: 'Production-ready student metrics platform.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased transition-colors duration-300 bg-slate-50 dark:bg-[#05090C]">
        <ThemeProvider>
          {/* Theme Toggle Button */}
          <div className="fixed top-6 right-8 z-50">
            <ThemeToggle />
          </div>
          
          {/* This is the invisible container that catches and displays the popups */}
          <Toaster position="bottom-right" richColors theme="system" />
          
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}