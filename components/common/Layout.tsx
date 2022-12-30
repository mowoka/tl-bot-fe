import { UserProfile } from "../../hooks/common/useUser";
import AppBarComponent from "./AppBar";

interface LayoutProps {
  children: JSX.Element[] | JSX.Element;
  profile?: UserProfile;
}

const Layout = (props: LayoutProps) => {
  const { children, profile } = props;
  return <AppBarComponent children={children} name={profile?.name} />;
};

export default Layout;
