import SnackbarMessage from "@app/components/common/Snackbar";
import FormPanel from "@app/components/login/FormPanel";
import TitlePanel from "@app/components/login/TitlePanel";
import { useLogin } from "@app/hooks/login/useLogin";
import Head from "next/head";

interface LoginProps {
  title: string;
  description: string;
}

const Login = (props: LoginProps) => {
  const { title, description } = props;
  const { nik, password, onChange, onSubmit, errorMessage, onCloseError } =
    useLogin();
  return (
    <div className="h-screen w-screen bg-primary flex justify-center items-center font-primary">
      <Head>
        <title>{title}</title>
        <meta key="description" name="description" content={description} />
      </Head>
      <SnackbarMessage
        show={errorMessage.show}
        message={errorMessage.message}
        status={errorMessage.status}
        onClose={onCloseError}
      />
      <div className="w-full max-w-[950px] h-full max-h-[500px] rounded-lg shadow-2xl flex flex-row justify-start items-center">
        <FormPanel
          nik={nik}
          password={password}
          onChange={onChange}
          onSubmit={onSubmit}
        />
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
