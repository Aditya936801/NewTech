import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { COURSES } from '../../../data/courses';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Tables=() =>{
  return (
    <TableContainer component={Paper} sx={{ mb:4 }}>
      <Table  aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>S No.</StyledTableCell>
            <StyledTableCell align="left">COURSE</StyledTableCell>
            <StyledTableCell align="left">DURATION</StyledTableCell>
            <StyledTableCell align="left">FEE</StyledTableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {COURSES.map((row,index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {index+1}
              </StyledTableCell>
              <StyledTableCell align="left"> {row.name}</StyledTableCell>
              <StyledTableCell align="left"> {row.duration}</StyledTableCell>
              <StyledTableCell align="left">Rs {row.fee}</StyledTableCell>
            
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Tables
