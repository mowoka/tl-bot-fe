import Head from "next/head";
import FormPanel from "../../components/Login/FormPanel";
import TitlePanel from "../../components/Login/TitlePanel";

interface LoginProps {
  title: string;
  description: string;
}

const Login = (props: LoginProps) => {
  const { title, description } = props;
  return (
    <div className="h-screen w-screen bg-primary flex justify-center items-center font-primary">
      <Head>
        <title>{title}</title>
        <meta key="description" name="description" content={description} />
      </Head>
      <div className="w-full max-w-[950px] h-full max-h-[500px] rounded-lg shadow-2xl flex flex-row justify-start items-center">
        <FormPanel />
        <TitlePanel />
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const title = "Login page";
  const description = "selamat datang di login page";
  return {
    props: {
      title,
      description,
    },
    revalidate: 60,
  };
}
export default Login;
