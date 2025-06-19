import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { Button } from '@mui/material';

export default function AccessibleTable({ data = [] }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = Array.isArray(data)
  ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  : [];


  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer>
        <Table aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell>Brand Name</TableCell>
              <TableCell align="center">Total Post</TableCell>
               <TableCell align="center">Created Post</TableCell>
               <TableCell align="center">Finish Post</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData?.length===0? (
               <TableRow>
               <TableCell colSpan={4} align="center">
                 There is no task.
               </TableCell>
             </TableRow>
            ):paginatedData?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item?.name}</TableCell>
                <TableCell align="center">{item?.totalPosts}</TableCell>
                 <TableCell align="center">{item?.tasks}</TableCell>
                <TableCell align="center">{item?.contentCompleteCount}</TableCell>
      <TableCell
  align="center"
  sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}
>
  {item?.remainingDays != null ? (() => {
    let bgColor = '';
    const remaining = item.remainingDays;
    const avg = item.avgPerDay;

    if (remaining <= avg) {
      bgColor = 'green';
    } else if (remaining > avg && remaining <= avg + 4) {
      bgColor = 'orange';
    } else {
      bgColor = 'red';
    }

    return (
      <Button
        sx={{
          textTransform: 'none',
          backgroundColor: bgColor,
          color: 'white',
          padding: '2px 4px',
          fontSize: '0.75rem',
        }}
      >
        {remaining <= avg ? "Good" :`${remaining-item?.avgPerDay} day`} 
      </Button>
    );
  })() : (
    <Button
      variant="outlined"
      sx={{
        textTransform: 'none',
        backgroundColor: 'gray',
        color: 'white',
        padding: '2px 4px',
        fontSize: '0.75rem',
      }}
    >
      Pending
    </Button>
  )}
</TableCell>


              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    {
      paginatedData?.length !==0 && (
        <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
      )
    }
    </Paper>
  );
}
