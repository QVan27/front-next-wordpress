import { useState } from 'react';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { Container, NavigationMenu, SkipNavigationLink } from '../../components';
import styles from './Header.module.scss';
import Image from 'next/image';

let cx = classNames.bind(styles);

export default function Header({
  title = 'Headless by WP Engine',
  description,
  logo,
  altText,
  menuItems
}) {
  const [isNavShown, setIsNavShown] = useState(false);

  return (
    <header className={cx('component')}>
      <SkipNavigationLink />
      <div className='grid grid-cols-12 lg:grid-cols-24 gap-x-2.5'>
        <div className='col-start-2 col-end-12 lg:col-start-3 lg:col-end-23 h-full'>
          {/* <Container> */}
          <div className={cx('navbar')}>
            <div className={cx('brand')}>
              <Link href="/">
                {/* <a className={cx('title')}>{title}</a> */}
                <Image
                  src={logo}
                  alt={altText}
                  width={210}
                  height={48}
                />
              </Link>
              {/* {description && <p className={cx('description')}>{description}</p>} */}
            </div>
            <button
              type="button"
              className={cx('nav-toggle')}
              onClick={() => setIsNavShown(!isNavShown)}
              aria-label="Toggle navigation"
              aria-controls={cx('primary-navigation')}
              aria-expanded={isNavShown}
            >
              ☰
            </button>
            <NavigationMenu
              className={cx(['primary-navigation', isNavShown ? 'show' : undefined])}
              menuItems={menuItems}
            />
          </div>
          {/* </Container> */}
        </div>
      </div>
    </header>
  );
}
