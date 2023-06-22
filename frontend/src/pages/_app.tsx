import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { UserContextProvider } from '@/context/userContext';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/Global/Header';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <Header />
      <Component {...pageProps} />
      <Toaster position="top-right" />
    </UserContextProvider>
  );
}
