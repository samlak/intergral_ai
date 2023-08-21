import Head from 'next/head';
import { Toaster } from "@/components/ui/toaster";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <meta
          name='description'
          content='Empowering freelancers with AI tools to elevate careers, streamline workflows, and transform the freelance landscape.'
        />
        <link rel='canonical' href='https://indielance.co/' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='Indielance' />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property='og:description'
          content='Empowering freelancers with AI tools to elevate careers, streamline workflows, and transform the freelance landscape.'
        />
        <meta property='og:image' content="./twitter_og.png" />
        <meta
          property='og:url'
          content='https://indielance.co/'
        />
        <meta property='og:site_name' content='Indielance' />
        <meta name='robots' content='index, follow' />
      </Head>
      {children}
      <Toaster />
    </>
  );
}
