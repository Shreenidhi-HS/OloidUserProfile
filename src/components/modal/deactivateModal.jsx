import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@radix-ui/react-dialog";
import { DialogHeader } from "../ui/dialog";
import Button from "../ui/button";

const DeactivateModal = ({ open, toggle, handleDeactivate }) => {
  return (
    <Dialog open={open} onOpenChange={toggle}>
      <DialogContent className="max-w-[90vw] md:max-w-md">
        <DialogHeader>
          <DialogDescription className="p-3">
            <span>
              Are you sure want to delete the selected Face credentials!
            </span>
            <div className="flex justify-between gap-4 mt-4">
              <Button
                className="bg-transparent flex-1 text-black border-[black] border-[1px]"
                onClick={toggle}
              >
                Cancel
              </Button>
              <Button className="bg-[red] flex-1" onClick={handleDeactivate}>
                Deactivate
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeactivateModal;
