import * as React from 'react';
import axios from '@/src/utils/axios';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useQueryClient } from '@tanstack/react-query';

interface IProjectOption {
  inputValue?: string;
  name: string;
}

const baseApi = process.env.NEXT_PUBLIC_API_URL;
const api = {
  postProjects: `${baseApi}/projects`,
};

const filter = createFilterOptions<IProjectOption>();

const SelectProject = ({ data, handleOptions }) => {
  const [value, setValue] = React.useState<IProjectOption | null>(null);

  const queryClient = useQueryClient();

  const addProject = async (val) => {
    try {
      const payload = {
        name: val
      }
      await axios
        .post(api.postProjects, payload)
        .then((res) => {
          if (res.data.status === 200) {
            queryClient.invalidateQueries(['project']);
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
          addProject(newValue.inputValue);
        } else {
          setValue(newValue);
        }     
        handleOptions('project', newValue);
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
      id="free-solo-project"
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
        <TextField {...params} label="Select Project" />
      )}
      sx={{
        my: 3
      }}
    />
  );
}

export default SelectProject;
