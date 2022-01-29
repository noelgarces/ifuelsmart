import { Menu } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { usePopper } from "react-popper";
import cn from "classnames";

const TableDropdown = () => {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, { placement: "bottom-end" });
  return (
    <>
      <Menu as={Fragment}>
        <Menu.Button ref={setReferenceElement} className="py-1 px-3 cursor-pointer focus:outline-none">
          <FaEllipsisV />
        </Menu.Button>

        <Menu.Items
          className="w-48 bg-white shadow border p-1 text-sm rounded focus:outline-none"
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <Menu.Item>
            {({ active }) => (
              <div
                className={cn(" w-full rounded text-left px-4 py-2 outline-none", {
                  "bg-gray-100": active,
                })}
              >
                Edit
              </div>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <div
                className={cn(" w-full rounded text-left px-4 py-2 outline-none", {
                  "bg-gray-100": active,
                })}
              >
                View public job page
              </div>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <div
                className={cn(" w-full rounded text-left px-4 py-2 outline-none", {
                  "bg-gray-100": active,
                })}
              >
                Delete
              </div>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </>
  );
};

export default TableDropdown;
