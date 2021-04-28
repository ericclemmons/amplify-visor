import { Dialog } from "@headlessui/react";

export default function Modal({ isOpen, onClose, children, buttons }) {
  return (
    <Dialog
      as="div"
      className="fixed inset-0 z-10 overflow-y-auto"
      open={isOpen}
      onClose={onClose}
    >
      <div className="min-h-screen px-4 text-center">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-20" />

        {/* This element is to trick the browser into centering the modal contents. */}
        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block w-full max-w-3xl pt-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
          <div className="pb-6 px-6">{children}</div>
          <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
            {buttons}
          </div>
        </div>
      </div>
    </Dialog>
  );
}
