import { gql } from '@apollo/client';
import {
  Footer,
  Header,
  Main,
  NavigationMenu,
} from '../components';
import * as MENUS from '../constants/menus';
import { flatListToHierarchical } from '@faustwp/core';
import { WordPressBlocksViewer } from '@faustwp/blocks';
import blocks from '../wp-blocks';
import parse from 'html-react-parser';
import Head from 'next/head';

export default function Component(props) {
  if (props.loading) {
    return <>Loading...</>;
  }

  const { title: siteTitle, metaDesc: siteDescription } =
    props?.data?.post?.seo ?? {};
  const fullHead = parse(props?.data?.post?.seo.fullHead);
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
  const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
  const { editorBlocks } = props?.data?.post ?? { title: '' };
  const blockList = flatListToHierarchical(editorBlocks, { childrenKey: 'innerBlocks' });

  return (
    <>
      <Head>{fullHead}</Head>
      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />
      <Main>
        <WordPressBlocksViewer blocks={blockList} />
      </Main>
      <Footer title={siteTitle} menuItems={footerMenu} />
    </>
  );
}

Component.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
    asPreview: ctx?.asPreview,
  };
};

Component.query = gql`
  ${NavigationMenu.fragments.entry}
  ${blocks.AcfBanner.fragments.entry}
  query GetPost(
    $databaseId: ID!
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $asPreview: Boolean = false
    ) {
    post(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      date
      author {
        node {
          name
        }
      }
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
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;