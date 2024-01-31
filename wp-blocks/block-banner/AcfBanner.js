import React, { useRef, useEffect } from 'react';
import { gql } from '@apollo/client';
import Image from 'next/image';
import styled from 'styled-components';
import gsap from 'gsap';

AcfBanner.fragments = {
  key: `AcfBannerFragment`,
  entry: gql`
    fragment AcfBannerFragment on AcfBanner {
      blockBanner {
        titre
        texte
        image {
          node {
            altText
            sourceUrl
          }
        }
      }
    }
  `,
};

const Section = styled.section`
  position: relative;
  overflow: hidden;

  .image {
    position: relative;
    height: 30rem;
  }
`

export default function AcfBanner(props) {
  const image = useRef(null)

  useEffect(() => {
    gsap.set(image.current, { opacity: 0 })

    gsap.to(image.current, {
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    })
  }, [])

  return (
    <Section>
      <div className='grid grid-cols-12 lg:grid-cols-24 gap-x-2.5 items-center'>
        <div className='col-start-2 col-end-12 lg:col-start-3 lg:col-end-11 h-full lg:relative'>
          <div className='image' ref={image}>
            {props.blockBanner.image &&
              <Image
                src={props.blockBanner.image?.node.sourceUrl}
                alt={props.blockBanner.image?.node.altText}
                objectFit="cover"
                layout='fill'
              />}
          </div>
        </div>
        <div className='content col-start-2 col-end-12 lg:col-start-12 lg:col-end-23 flex flex-col gap-y-5'>
          <h1>
            {props.blockBanner.titre}
          </h1>
          <div>
            {props.blockBanner.texte}
          </div>
        </div>
      </div>
    </Section >
  )
}

AcfBanner.displayName = 'AcfBanner';