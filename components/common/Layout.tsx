import AppBarComponent from "./AppBar";

interface LayoutProps {
  children: JSX.Element[] | JSX.Element;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;
  return <AppBarComponent children={children} />;
};

export default Layout;
