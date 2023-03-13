import { Box } from '@mui/material';

import { CircularProgress } from '../CircularProgress';

export const PageLoader = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="100%" width="100%">
      <CircularProgress value={200} />
    </Box>
  );
};
