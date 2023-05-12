interface OptionsMenuProps {
  handleOpenModal: (title: string) => void;
}

export default function OptionsMenu(props: OptionsMenuProps) {
  const { handleOpenModal } = props;
  return (
    <div className="py-6 flex flex-row items-center justify-start flex-wrap w-full">
      {["Sector", "Witel", "Partner", "Regional"].map((item, index) => (
        <div
          className="px-4 py-3 bg-blue-400 mx-2 text-white flex-1 cursor-pointer rounded-md text-center font-semibold"
          key={index}
          onClick={() => handleOpenModal(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
