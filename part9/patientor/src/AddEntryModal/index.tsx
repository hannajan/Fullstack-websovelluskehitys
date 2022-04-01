import React from "react";
import { Dialog, DialogTitle, DialogContent, Divider } from "@material-ui/core";
import AddEntryForm from "../AddEntryModal/AddEntryForm";
import { EntryFormValuesDivided } from "../AddEntryModal/AddEntryForm";
import { Alert } from "@material-ui/lab";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValuesDivided) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  return (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
      <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </DialogContent>
  </Dialog>
);};

export default AddEntryModal;
