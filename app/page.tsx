'use client';

import React from 'react';
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import DashboardLayout from '@/src/components/Layouts/Dashboard';
import Editor from '@monaco-editor/react';
import SelectProject from '@/src/components/CustomSelect/SelectProject';
import SelectFeature from '@/src/components/CustomSelect/SelectFeature';
import styles from './page.module.css';

interface IFormData {
  project?: string;
  feature?: string;
  path?: string;
  json: string;
}

const Home = () => {

  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<IFormData | null>(null);

  const changeOptions = (key, field) => {
    setData({...data, [key]: field});
  }

  const handleEditorChange = (value) => {
    setData({...data, json: JSON.stringify(value)});
  }

  const pathFormat = (str) => {
    if(!str) return;

    return str?.toLowerCase().replace(/[^A-Z0-9]+/ig, "-") + "/";
  }

  const onSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);

    console.log(data);
  }

  return (
    <DashboardLayout>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Box className={styles.editorWrapper}>
          <Editor
            height={`calc(100vh - 64px)`}
            language="json"
            options={{
              inlineSuggest: true,
              fontSize: "16px",
              formatOnType: true,
              autoClosingBrackets: true,
              minimap: {
                enabled: false,
              },
              tabSize: 2,
            }}
            onChange={handleEditorChange}
          />
        </Box>
        <Box 
          sx={{ px: 4, py: 5 }}
          className={styles.editorSidebar}
        >
          <Box>
            <SelectProject handleOptions={changeOptions} />
          </Box>
          <Box>
            <SelectFeature handleOptions={changeOptions} />
          </Box>
          <Box>
            <TextField
              label="Path"
              id="path-adornment"
              fullWidth
              InputProps={{
                startAdornment: 
                  <InputAdornment position="start">/
                    {pathFormat(data?.project?.title)}
                    {pathFormat(data?.feature?.title)}
                  </InputAdornment>,
              }}
              onChange={(e) => {
                setData({...data, path: e.target.value});
              }}
            />
          </Box>
          <Button
            fullWidth 
            variant="contained"
            size="large" 
            sx={{ my: 3 }}
            onClick={onSubmit}
            disabled={loading}
          >
            {loading ? <CircularProgress color="inherit" size="1.6rem" /> : 'Submit'}
          </Button>
        </Box>
      </Box>
    </DashboardLayout>
  );
}

export default Home;
