import { UserProfile } from "../../hooks/common/useUser";
import AppBarComponent from "./AppBar";

interface LayoutProps {
  children: JSX.Element[] | JSX.Element;
  profile?: UserProfile;
  footer?: boolean;
}

const Layout = (props: LayoutProps) => {
  const { children, profile, footer } = props;
  return (
    <AppBarComponent children={children} name={profile?.name} footer={footer} />
  );
};

export default Layout;
