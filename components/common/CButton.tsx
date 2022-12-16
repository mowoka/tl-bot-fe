import Button from "@mui/material/Button";
interface ButtonProps {
  text: string;
  disable?: boolean;
  onClick: () => void;
}

const CButton = (props: ButtonProps) => {
  return (
    <Button
      className="w-full bg-black hover:bg-red h-[50px]"
      onClick={props.onClick}
      variant="contained"
      disabled={props.disable ?? false}
    >
      {props.text}
    </Button>
  );
};

export default CButton;
