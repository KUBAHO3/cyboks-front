import React, { useState } from "react";
import { Modal } from "antd";
import { openSans } from "@/utils/fonts";
import { toast } from "react-toastify";
import { refreshPage } from "@/utils";
import { server } from "@/utils/axios";
import Spinner from "../shared/Spinner";

interface Props {
  companyId: number;
  isPending?: boolean;
  reviewerApprove?: boolean;
  ncsaApprove?: boolean;
}

const SendCompanyModal = ({ companyId, isPending, reviewerApprove, ncsaApprove }: Props) => {
  // local states
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // handler
  const sendHandler = async () => {
    setIsLoading(true);
    const endpoint = isPending ? `/update/toggleReviewerApprove/${companyId}` : `/update/toggleNcsaApprove/${companyId}`;

    const res = await server.patch(endpoint);

    if (res) {
      toast.success("Company sent successfully.");

      setOpen(false);
      setIsLoading(false);

      return refreshPage();
    }

    setIsLoading(false);

    return toast.error("An error occured.");
  };

  return (
    <>
      {isPending ? (
        <span
          className="text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center gap-1 dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800"
          onClick={() => setOpen(true)}
        >
          {reviewerApprove?'Un Send':'Send'}
        </span>
      ) : (
        <button
          className="text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center gap-1 dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800"
          onClick={() => setOpen(true)}
        >
          {ncsaApprove?'Un Approve':'Approve'}
        </button>
      )}

      <Modal
        title={isPending?"Send Company ?":"Approve Company ?"}
        width={400}
        open={open}
        className={`${openSans.className}`}
        onCancel={() => setOpen(false)}
        footer={
          <div className="flex justify-end items-center gap-2">
            <button
              className="text-gray-700 border-2 border-gray-400 hover:border-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-400 font-medium rounded-lg text-sm px-5 py-2 text-center flex items-center justify-center gap-1 min-w-[6rem] min-h-[2.45rem]"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>

            <button
              className="text-white border-2 border-violet-700 bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2 text-center flex items-center justify-center gap-1 dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800 min-w-[6rem] min-h-[2.45rem]"
              onClick={sendHandler}
            >
              {isLoading ? <Spinner /> : "Approve"}
            </button>
          </div>
        }
      >
        <div className="min-h-[2vh]" />
      </Modal>
    </>
  );
};

export default SendCompanyModal;
