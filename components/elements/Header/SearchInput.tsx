import { $mode } from '@/context/mode'
import {
  controlStyles,
  inputStyles,
  menuStyles,
  optionStyles,
} from '@/styles/searchInput'
import { SelectOptionType } from '@/types/common'
import { useStore } from 'effector-react'
import { useState } from 'react'
import Select from 'react-select'

const SearchInput = () => {
  const mode = useStore($mode)
  const [searchOption, setSearchOption] = useState<SelectOptionType>(null)

  const handleSearchOptionChange = (selectedOption: SelectOptionType) => {
    setSearchOption(selectedOption)
  }

  return (
    <Select
      placeholder="Я ищу..."
      value={searchOption}
      onChange={handleSearchOptionChange}
      styles={{
        ...inputStyles,
        control: (defaultStyles) => ({ ...controlStyles(defaultStyles, mode) }),
        input: (defaultStyles) => ({
          ...defaultStyles,
          color: mode === 'dark' ? '#f2f2f2' : '#222222',
        }),
        menu: (defaultStyles) => ({
          ...menuStyles(defaultStyles, mode),
        }),
        option: (defaultStyles, state) => ({
          ...optionStyles(defaultStyles, state, mode),
        }),
      }}
      isClearable={true}
      openMenuOnClick={false}
      options={[1, 2, 3, 5, 6, 7, 12, 34, 65, 343, 43, 32, 34, 56, 78].map(
        (item) => ({ value: item, label: item })
      )}
    />
  )
}

export default SearchInput
