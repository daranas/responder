'use client'

import DashboardLayout from '@/src/components/Layouts/Dashboard';
import Editor from '@monaco-editor/react';
import styles from './page.module.css';

const Home = () => {
  return (
    <DashboardLayout>
      <div className={styles.editorWrapper}>
        <Editor
          height="65vh"
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
        />
      </div>
    </DashboardLayout>
  );
}

export default Home;
