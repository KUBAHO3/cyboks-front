"use client"
import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

interface InputProps {
    labelName: string,
    containerClass: string,
    elements: Elements[]
}

interface Elements {
  id: number
  name: string
}

export default function FormDropdown( { elements, labelName, containerClass }: InputProps) {
  console.log(elements)
  const [selected, setSelected] = useState<Elements>(elements[0])
  const [query, setQuery] = useState<string>('')

  const filteredElements: Elements[] =
    query === ''
      ? elements
      : elements.filter((element) =>
          element.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )

  return (
    <div className={containerClass}>
        <label htmlFor="text" className="text-gray-700 text-sm font-normal font-['Poppins']">{labelName}</label>
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative border border-gray-300 text-gray-900 w-full cursor-default overflow-hidden rounded-sm bg-white text-left focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(element: Elements) => element.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
              {filteredElements.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredElements.map((element) => (
                  <Combobox.Option
                    key={element.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={element}
                  >
                    {({ selected, active }) => (
                      <>
                        
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                            {element.name}
                        </span>
                        
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}
