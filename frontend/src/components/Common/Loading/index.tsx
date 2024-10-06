import { CircularProgress } from '@mui/material';
import React from 'react';

const Loading = ({ isLoading = true }: { isLoading?: boolean }) => {
  return (
    <>
      {isLoading && (
        <div className='absolute inset-0 flex items-center justify-center bg-white bg-opacity-75'>
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default Loading;
