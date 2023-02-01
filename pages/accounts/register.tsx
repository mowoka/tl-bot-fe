import SnackbarMessage from "@app/components/common/Snackbar";
import { CollectionForm } from "@app/components/registers/collectionForm";
import { RegisterPanel } from "@app/components/registers/regiterPanel";
import useRegister from "@app/hooks/registers/useRegister";
import Head from "next/head";

interface RegisterProps {
  title: string;
  description: string;
}

const Register = (props: RegisterProps) => {
  const { title, description } = props;
  const {
    registerRoot,
    errorMessage,
    onCloseError,
    nik,
    onChange,
    onValidateNik,
    onSubmit,
  } = useRegister();

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
      {registerRoot.nik ? (
        <CollectionForm
          registerRoot={registerRoot}
          onChange={onChange}
          onSubmit={onSubmit}
        />
      ) : (
        <RegisterPanel
          nik={nik}
          onChange={onChange}
          onValidateNik={onValidateNik}
        />
      )}
    </div>
  );
};

export async function getStaticProps() {
  const title = "Register page";
  const description = "selamat datang di register page";
  return {
    props: {
      title,
      description,
    },
    revalidate: 60,
  };
}

export default Register;
