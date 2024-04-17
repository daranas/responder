import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

interface IFeatureOption {
  inputValue?: string;
  title: string;
}

const filter = createFilterOptions<IFeatureOption>();

const SelectFeature = ({ handleOptions }) => {
  const [value, setValue] = React.useState<IFeatureOption | null>(null);

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (newValue && newValue.inputValue) {
          setValue({
            title: newValue.inputValue,
          });
          newValue.title = newValue.inputValue;
        } else {
          setValue(newValue);
        }

        handleOptions('feature', newValue);
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        const isExisting = options.some((option) => inputValue === option.title);
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            title: `Add "${inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={top100Films}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option.title;
      }}
      renderOption={(props, option) => <li {...props} key={props.key}>{option.title}</li>}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label="Select Feature" />
      )}
      sx={{
        my: 3
      }}
    />
  );
}

export default SelectFeature;

const top100Films: readonly IFeatureOption[] = [
  { id: 1, title: 'The Shawshank Redemption' },
  { id: 2, title: 'The Godfather' },
  { id: 3, title: 'The Godfather: Part II' },
];