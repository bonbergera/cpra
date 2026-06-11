
import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CPRA Insight | Centre for Peace Research and Advocacy',
  description: 'Promoting democracy, human rights, and social justice across Southern Africa through research and advocacy.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Literata:ital,opsz,wght@0,7..72,200..900;1,7..72,200..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
