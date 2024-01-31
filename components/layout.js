import { LenisScroller } from "@utils/LenisScroller";

const Layout = ({ children }) => {
  return (
    <>
      <LenisScroller />
      {children}
    </>
  );
};

export default Layout;
