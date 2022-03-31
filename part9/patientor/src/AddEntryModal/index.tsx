import React from "react";
import { Dialog, DialogTitle, DialogContent, Divider } from "@material-ui/core";
import AddEntryForm from "../AddEntryModal/AddEntryForm";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new entry</DialogTitle>
    <Divider />
    <DialogContent>
      <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;
