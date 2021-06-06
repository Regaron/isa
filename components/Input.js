import { SearchIcon } from "@heroicons/react/solid";

export default function Input({ setTerm }) {
  return (
    <div className={"col-span-8"}>
      <label
        htmlFor="price"
        className="block text-sm font-medium text-gray-700"
      >
        SQL Injection
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </span>
        </div>
        <input
          type="text"
          name="price"
          id="price"
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-8 pr-12 sm:text-sm border-gray-300 rounded-md"
          placeholder="Search Products"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setTerm(e.target.value);
            }
          }}
        />
      </div>
    </div>
  );
}
