import { useRef, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { ModalCloseButton, ModalHeader, StyledModal } from "./styles";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const closeModal = () => {
    onClose();
    dialogRef.current?.close();
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <StyledModal
      onClick={(e) => e.target === dialogRef.current && closeModal()}
      ref={dialogRef}
    >
      <ModalHeader>
        <h3>{title}</h3>
        <ModalCloseButton
          onClick={closeModal}
          value={false}
          Icon={<RxCross1 />}
        />
      </ModalHeader>
      {children}
    </StyledModal>
  );
};
