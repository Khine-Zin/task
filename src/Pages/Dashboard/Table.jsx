import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

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
              <TableCell align="left">Headline</TableCell>
              <TableCell align="left">Content</TableCell>
              <TableCell align="left">Design</TableCell>
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
                <TableCell>{item?._id?.brand}</TableCell>
                <TableCell align="left">{item?.total?.headline}</TableCell>
                <TableCell align="left">{item?.total?.content}</TableCell>
                <TableCell align="left">{item?.total?.design}</TableCell>
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
