import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import IconButton, { IconButtonStyleTypes } from "../buttons/IconButton";
import { axiosInstance } from "../../api/axiosInterceptors";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Modal, { useModal } from "../Modal";
import Button from "../buttons/Button";
import { useNavigate } from "react-router-dom";

export default function PostAuthorButtons({
  postId,
  handlePostDelete,
  type = "primary",
}: {
  postId: number;
  handlePostDelete: (id: number) => void;
  type?: IconButtonStyleTypes;
}) {
  const { isOpen, onOpen, onClose } = useModal();
  const navigate = useNavigate();

  return (
    <div className="z-10 flex flex-row gap-x-2 text-black">
      <IconButton type={type} onClick={() => navigate("/editpost/" + postId)}>
        <EditOutlinedIcon fontSize="inherit" />
      </IconButton>
      <IconButton type={type} onClick={onOpen}>
        <DeleteOutlineOutlinedIcon fontSize="inherit" />
      </IconButton>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Are you sure to delete the post?"
      >
        <div className="flex flex-row gap-x-4">
          <Button
            onClick={() =>
              axiosInstance.delete("api/post/" + postId).then(() => {
                onClose();
                handlePostDelete(postId);
              })
            }
          >
            Delete
          </Button>
          <Button type="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
}
