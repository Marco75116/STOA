import { FC, Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ReactComponent as Arrow } from "../../assets/icons/Arrow.svg";
import { ReactComponent as CheckPink } from "../../assets/icons/CheckPink.svg";
import { ReactComponent as MetamaskLogo } from "../../assets/logos/MetamaskLogo.svg";
import { ReactComponent as USDC } from "../../assets/logos/USDC.svg";
import { ReactComponent as VaultLogo } from "../../assets/logos/LogoVault.svg";

type OptionVaults = {
  name: string;
  amount?: number;
};

type ListboxComponentProps = {
  list: OptionVaults[];
  width?: number;
};

const ListboxComponent: FC<ListboxComponentProps> = ({ list, width }) => {
  const [selected, setSelected] = useState(list[0]);

  useEffect(() => {
    setSelected(list[0]);
  }, [list]);

  return (
    <div className={`w-[${width ? width : "128"}px]`}>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm">
            <span className="block flex flex-row items-center gap-[6px] truncate">
              {selected.name === "USDC" ? (
                <>
                  <USDC /> {selected.name}
                </>
              ) : (
                selected.name
              )}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <Arrow />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className={`absolute mt-1 max-h-60 ring-black ${
                list[0].amount !== undefined ? "w-[220px]" : "w-[100%]"
              }  overflow-auto rounded-md bg-white text-base shadow-lg ring-opacity-5 focus:outline-none sm:text-sm`}
            >
              {list.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-[#E4E4E6] text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        } ${
                          person.amount !== undefined &&
                          "flex flex-row justify-between "
                        }`}
                      >
                        <div className="flex flex-row gap-2">
                          {person.name === "Metamask" ? (
                            <MetamaskLogo />
                          ) : (
                            <VaultLogo />
                          )}
                          {person.name}
                        </div>
                        {person.amount && (
                          <div className=" text-textGray">${person.amount}</div>
                        )}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckPink />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
export default ListboxComponent;
