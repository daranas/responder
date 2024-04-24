import * as React from 'react';
import axios from '@/src/utils/axios';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useQueryClient } from '@tanstack/react-query';

interface IFeatureOption {
  inputValue?: string;
  name: string;
}

const baseApi = process.env.NEXT_PUBLIC_API_URL;
const api = {
  postFeature: `${baseApi}/features`,
};

const filter = createFilterOptions<IFeatureOption>();

const SelectFeature = ({ data, handleOptions }) => {
  const [value, setValue] = React.useState<IFeatureOption | null>(null);

  const queryClient = useQueryClient();

  const addFeature = async (val) => {
    try {
      const payload = {
        name: val
      }
      await axios
        .post(api.postFeature, payload)
        .then((res) => {
          if (res.data.status === 200) {
            queryClient.invalidateQueries(['feature']);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (newValue && newValue.inputValue) {
          setValue({
            name: newValue.inputValue,
          });
          newValue.name = newValue.inputValue;
          addFeature(newValue.inputValue);
        } else {
          setValue(newValue);
        }
        handleOptions('feature', newValue);
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        const isExisting = options.some((option) => inputValue === option.name);
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            name: `Add "${inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-feature"
      options={data}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option.name;
      }}
      renderOption={(props, option) => <li {...props} key={props.key}>{option.name}</li>}
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
