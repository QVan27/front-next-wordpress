import '../faust.config';
import React from 'react';
import Layout from '@components/layout';
import { useRouter } from 'next/router';
import { FaustProvider } from '@faustwp/core';
import { WordPressBlocksProvider } from '@faustwp/blocks';
import blocks from '../wp-blocks/index.js';
import '@faustwp/core/dist/css/toolbar.css';
import '../styles/global.scss';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <Layout>
      <FaustProvider pageProps={pageProps}>
        <WordPressBlocksProvider
          config={{
            blocks,
            theme: null
          }}>
          <Component {...pageProps} key={router.asPath} />
        </WordPressBlocksProvider>
      </FaustProvider>
    </Layout>
  );
}
