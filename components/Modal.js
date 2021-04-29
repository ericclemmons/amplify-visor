import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function Modal({ isOpen, onClose, children, buttons }) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        open={isOpen}
        onClose={onClose}
        static
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div classname="fixed inset-0">
              <Dialog.Overlay className="fixed inset-0 bg-gray-900 opacity-20" />
            </div>
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-5xl pt-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-md shadow-xl">
              <div className="px-6 pb-6">{children}</div>
              <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
                {buttons}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
