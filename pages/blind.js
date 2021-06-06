import { Fragment, useState } from "react";
import fs from "fs";
import Button from "../components/Button";
import SQLInjection from "../components/SQLInjection";

export default function Blind({ defaultPayload }) {
  const [payload, setPayload] = useState({});
  function readFile(e) {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      const reader = new FileReader();
      reader.readAsText(e.target.files[0]);
      reader.onload = function () {
        console.log(reader.result.split("\n"));
      };
    }
  }
  function loadDefaultPayload() {
    setPayload(defaultPayload);
  }
  return (
    <Fragment>
      <div className="m-4 grid grid-cols-5 items-end gap-8">
        <div className="col-span-3">
          <label className="block text-sm font-medium text-gray-700">
            Payload
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={readFile}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                {payload.fileName
                  ? "File Uploaded: " + payload.fileName
                  : ".txt file containing SQLi payload"}
              </p>
            </div>
          </div>
        </div>
        <Button onClick={loadDefaultPayload}>Default Payload</Button>
        <Button>Start</Button>
      </div>
      <div className={"m-4 grid grid-cols-3 gap-4"}>
        {payload.content?.map((string, index) => (
          <SQLInjection key={index}>{string}</SQLInjection>
        ))}
      </div>
    </Fragment>
  );
}

export async function getStaticProps() {
  const content = fs.readFileSync("public/payload.txt", "utf-8").split("\n");
  return {
    props: {
      defaultPayload: {
        content,
        fileName: "payload.txt",
      },
    },
  };
}
