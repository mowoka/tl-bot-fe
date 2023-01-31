import { UserProfile } from "../../hooks/common/useUser";
import AppBarComponent from "./AppBar";

interface LayoutProps {
  children: JSX.Element[] | JSX.Element;
  profile?: UserProfile;
  logout: () => void;
}

const Layout = (props: LayoutProps) => {
  const { children, profile, logout } = props;
  return (
    <AppBarComponent name={profile?.name} logout={logout}>
      {children}
    </AppBarComponent>
  );
};

export default Layout;
