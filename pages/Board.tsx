import { Divider } from "@mui/material";
import Layout from "../components/common/Layout";
import FormPerformansi from "../components/board/Form";

const Board = () => {
  return (
    <Layout>
      <h2 className="font-semibold text-4xl py-4">Tl Board</h2>
      <Divider />
      <h3 className="font-normal text-xl py-4">Input Performasi</h3>
      <FormPerformansi />
    </Layout>
  );
};

export default Board;
