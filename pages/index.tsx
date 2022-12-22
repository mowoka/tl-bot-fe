import Layout from "../components/common/Layout";
import { useGuard } from "../hooks/common/userGuard";
import useHome from "../hooks/home/useHome";

export default function Home() {
  useGuard();
  const { profile } = useHome();

  return (
    <div className="h-screen w-screen">
      <Layout>
        <p>lol</p>
      </Layout>
    </div>
  );
}
