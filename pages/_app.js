import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import '../styles/fonts.css';
import Head from "next/head";
import Layout from "../components/Layout";
import { AuthProvider } from "../lib/auth";

const App = ({ Component, pageProps }) => {
  return (
    <>
      {/* <Head>
        <link
          rel="shortcut icon"
          href="favicon/favicon.ico"
          type="image/x-icon"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="favicon/site.webmanifest"></link>
        <link rel="canonical" href="" />
        <title> Trivia </title>
        <meta name="title" content="Trivia" />
        <meta
          name="description"
          content="Una trivia online con preguntas muy divertidas!"
        />
        <meta property="og:title" content="TribiTrivia" />
        <meta
          property="og:description"
          content="Una trivia online con preguntas muy divertidas!"
        />
        <meta property="twitter:url" content="TribiTrivia" />
        <meta property="twitter:title" content="TribiTrivia" />
        <meta
          property="twitter:description"
          content="Trivia - **TODO Description**"
        />
        <meta property="og:url" content="Trivia - **TODO URL**" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="Trivia - **TODO Social img**" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content="Trivia - **TODO Image**" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=5"
        />
      </Head> */}
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </>
  );
};
export default App;
