import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { getOrganizationsRequest, removeOrganizationsRequest } from '../../api'
import TableCellActions from '../../components/TableCellActions'

const OrganizationListPage = () => {
  const history = useHistory();
  const [organizations, setOrganizations] = React.useState([])

  async function handleEditRecord(id: string) {
    history.push(`/organizations/${id}/edit`);
  }
  async function handleDeleteRecord(id: string) {
    try {
      await removeOrganizationsRequest(id)
      getOrgs()
    } catch (error) {
      console.log(error);
    }
  }

  async function getOrgs() {
    try {
      const orgs = await getOrganizationsRequest();
      setOrganizations(orgs);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(()=>{
    getOrgs()
  },[])

  return (
    <Box sx={{ height: 'inherit', width: 'inherit' }}>
    <Typography variant="h3" gutterBottom>
      Organizations
    </Typography>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'end',
      }}
    >
      <Button variant="contained" component={Link} to="/organizations/new">
        New
      </Button>
    </Box>
    <Box sx={{ height: '90%' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="value stream table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {organizations.map((org : any) => (
              <TableRow
                key={org.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {org.id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {org.name || 'No name defined'}
                </TableCell>
                <TableCellActions
                  id={org.id}
                  handleEditRecord={handleEditRecord}
                  handleDeleteRecord={handleDeleteRecord}
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  </Box>
  )
}

export default OrganizationListPage