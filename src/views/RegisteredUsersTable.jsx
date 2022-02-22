import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const renderRow = ({ id, firstName, lastName, projectIds = [], country }) => {

    return (
        <TableRow
            key={id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {id}
            </TableCell>
            <TableCell align="right">{firstName}</TableCell>
            <TableCell align="right">{lastName}</TableCell>
            <TableCell align="right">{projectIds.join(",")}</TableCell>
            <TableCell align="right">{country}</TableCell>
        </TableRow>
    )

}
export const RegisteredUsersTable = ({ data }) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">ID</TableCell>
                        <TableCell align="right">First Name</TableCell>
                        <TableCell align="right">Last Name</TableCell>
                        <TableCell align="right">Project IDs</TableCell>
                        <TableCell align="right">Country</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(rowData =>
                        renderRow(rowData))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}