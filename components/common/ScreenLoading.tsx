import { LinearProgress } from "@mui/material";

export const ScreenLoading = () => {
  return (
    <div className="w-screen h-screen bg-primary flex justify-center flex-col items-center">
      <h1 className="uppercase font-semibold text-4xl text-black">IOAN</h1>
      <h1 className="uppercase font-semibold text-4xl text-black">DASHBOARD</h1>
      <div className="w-full py-4 max-w-[300px]">
        <LinearProgress />
      </div>
    </div>
  );
};
