import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import type { ReactNode } from "react";
import { Fragment } from "react/jsx-runtime";

interface IProps {
  isOpen: boolean;
  close: () => void;
  title?: string;
  children: ReactNode;
}

const MyModal = ({ isOpen, close, title, children }: IProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div
          className="fixed inset-0 bg-black/25 backdrop-blur-sm"
          aria-hidden="true"
        >
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl shadow-lg transition-all duration-300 ease-out data-[state=closed]:scale-95 data-[state=closed]:opacity-0"
            >
              {title && (
                <DialogTitle
                  as="h3"
                  className="text-base/7 font-medium text-black"
                >
                  {title}
                </DialogTitle>
              )}

              <div className="mt-4 flex flex-col gap-4">{children}</div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default MyModal;
