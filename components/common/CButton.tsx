import Button from "@mui/material/Button";

interface ButtonProps {
  text: string;
  disable?: boolean;
  onClick: () => void;
}

export const CButton = (props: ButtonProps) => {
  return (
    <Button
      className="w-full bg-black  h-[50px]"
      onClick={props.onClick}
      variant="contained"
      disabled={props.disable ?? false}
    >
      {props.text}
    </Button>
  );
};

export const EButton = (props: ButtonProps) => {
  return (
    <Button
      className="w-full bg-red hover:bg-red h-[56px]"
      onClick={props.onClick}
      variant="contained"
      disabled={props.disable ?? false}
    >
      {props.text}
    </Button>
  );
};

export const OButton = (props: ButtonProps) => {
  return (
    <Button
      className="w-full h-[56px]"
      onClick={props.onClick}
      variant="outlined"
      color="primary"
      disabled={props.disable ?? false}
    >
      {props.text}
    </Button>
  );
};
