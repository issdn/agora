import CloseIcon from "@mui/icons-material/Close";

export default function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-3xl flex flex-row justify-center items-center p-0.5 rounded-lg bg-gray-100 hover:bg-gray-50"
    >
      <CloseIcon fontSize="inherit" />
    </button>
  );
}
