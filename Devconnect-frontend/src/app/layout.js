import './globals.css';

export const metadata = {
  title: 'DevConnect — Professional Network for Developers',
  description: 'Connect with developers, share your work, grow your career.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
