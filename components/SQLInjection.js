import useSWR from "swr";
import { useState } from "react";
import Modal from "./Modal";
import {
  CheckCircleIcon,
  RefreshIcon,
  XCircleIcon,
} from "@heroicons/react/solid";

export default function SQLInjection({ children }) {
  const [open, setOpen] = useState(false);
  const { data, error } = useSWR("/api/search?term=" + children);
  return (
    <div
      onClick={() => {
        if (!error && data) {
          setOpen(true);
        }
      }}
      className={`
        ${
          error ? "ring-red-600" : data ? "ring-green-600" : "ring-yellow-500"
        } ${
        data ? "cursor-pointer" : "cursor-not-allowed"
      } ring-1 flex justify-between items-center px-4 py-5 sm:px-6 bg-white shadow overflow-hidden sm:rounded-lg
      `}
    >
      <div className="">
        <h3 className="text-lg leading-6 font-medium text-gray-900 whitespace-pre-line">
          {children}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          {error ? "Injection Error" : data ? "Injected" : "Injecting..."}
        </p>
      </div>
      <div>
        {error ? (
          <XCircleIcon className="h-6 w-6 text-red-500" />
        ) : data ? (
          <CheckCircleIcon className="h-6 w-6 text-green-500" />
        ) : (
          <RefreshIcon className="animate-spin h-6 w-6 text-yellow-400" />
        )}
      </div>
      {data && <Modal data={data} open={open} setOpen={setOpen} />}
    </div>
  );
}
