import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

const SmallBreadcrumbs=({title,ActiveTitle,link})=> {
  return (
    <div role="presentation" >
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          color="inherit"
          href={link}
        >
          {title}
        </Link>
        <Typography sx={{ color: '#000000' }}>{ActiveTitle}</Typography>
      </Breadcrumbs>
    </div>
  );
}
export default SmallBreadcrumbs;