import { gql } from '@apollo/client';
import * as MENUS from '../constants/menus';
// import { BlogInfoFragment } from '../fragments/GeneralSettings';
import {
  Header,
  Footer,
  Main,
  NavigationMenu,
  FeaturedImage,
  SEO,
} from '../components';

import { flatListToHierarchical } from '@faustwp/core';
import { WordPressBlocksViewer } from '@faustwp/blocks';
import blocks from '../wp-blocks';

export default function Component(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  const logo = {
    src: props?.data?.header?.optionsHeader?.logo.node.sourceUrl ?? '',
    alt: props?.data?.header?.optionsHeader?.logo.node.altText ?? '',
  };

  const { title: siteTitle, metaDesc: siteDescription } =
    props?.data?.page?.seo ?? {};
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
  const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
  const { featuredImage, editorBlocks } = props?.data?.page ?? { title: '' };
  const blockList = flatListToHierarchical(editorBlocks, { childrenKey: 'innerBlocks' });

  return (
    <>
      <SEO
        title={siteTitle}
        description={siteDescription}
        imageUrl={featuredImage?.node?.sourceUrl}
      />
      <Header
      logo={logo.src}
      altText={logo.alt}
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
  ${FeaturedImage.fragments.entry}
  ${blocks.AcfBanner.fragments.entry}
  query GetPageData(
    $databaseId: ID!
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $asPreview: Boolean = false
  ) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      seo {
        metaDesc
        title
      }
      editorBlocks(flat: false) {
        name
        __typename
        renderedHtml
        id: clientId
        parentId: parentClientId
        ...${blocks.AcfBanner.fragments.key}
      }
      ...FeaturedImageFragment
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
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;
