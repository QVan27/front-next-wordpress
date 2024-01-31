import { gql } from '@apollo/client';
import * as MENUS from '../constants/menus';
import {
  Header,
  Footer,
  Main,
  NavigationMenu,
} from '../components';
import { flatListToHierarchical } from '@faustwp/core';
import { WordPressBlocksViewer } from '@faustwp/blocks';
import blocks from '../wp-blocks';
import Grid from '@utils/Grid.js';
import parse from 'html-react-parser';
import Head from 'next/head';

export default function Component({ data }) {
  if (data.loading) {
    return <>Loading...</>;
  }

  const logo = {
    src: data?.header?.optionsHeader?.logo.node.sourceUrl ?? '',
    alt: data?.header?.optionsHeader?.logo.node.altText ?? '',
  };


  // const logo = data?.header?.optionsHeader?.logo.node.sourceUrl ?? '';
  const { title: siteTitle, metaDesc: siteDescription } = data?.page?.seo ?? {};
  const fullHead = parse(data?.page?.seo.fullHead);
  const primaryMenu = data?.headerMenuItems?.nodes ?? [];
  const footerMenu = data?.footerMenuItems?.nodes ?? [];
  const { editorBlocks } = data?.page;
  const blockList = flatListToHierarchical(editorBlocks, { childrenKey: 'innerBlocks' });

  return (
    <>
      <Head>{fullHead}</Head>
      <Header
        logo={logo.src}
        altText={logo.alt}
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />
      <Grid />
      <Main>
        <WordPressBlocksViewer blocks={blockList} />
      </Main>
      <Footer title={siteTitle} menuItems={footerMenu} />
    </>
  );
}

Component.query = gql`
  ${NavigationMenu.fragments.entry}
  ${blocks.AcfBanner.fragments.entry}
  query GetPage(
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $databaseId: ID!
    $asPreview: Boolean = false
  ) {
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    header {
      optionsHeader {
        logo {
          node {
            altText
            id
            sourceUrl
          }
        }
      }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      seo {
        metaDesc
        title
        fullHead
      }
      editorBlocks(flat: false) {
        name
        __typename
        renderedHtml
        id: clientId
        parentId: parentClientId
        ...${blocks.AcfBanner.fragments.key}
      }
    }
  }
`;

Component.variables = ({ databaseId }, ctx) => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
    databaseId,
    asPreview: ctx?.asPreview,
  };
};