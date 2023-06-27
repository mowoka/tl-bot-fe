import Layout from "@app/components/common/Layout";
import { useProfile } from "@app/hooks/common/useProfile";

export default function Binding() {
  const { profile } = useProfile();
  return (
    <Layout
      profile={profile}
      logout={() => {
        return;
      }}
    >
      <p>binding</p>
    </Layout>
  );
}
