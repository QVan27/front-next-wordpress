import { LenisScroller } from "@utils/LenisScroller";
import Grid from '@utils/Grid.js';

const Layout = ({ children }) => {
  return (
    <>
      <Grid />
      <LenisScroller />
      {children}
    </>
  );
};

export default Layout;
