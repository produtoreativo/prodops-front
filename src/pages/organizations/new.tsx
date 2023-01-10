import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getOrganizationsRequest, saveOrganizationsRequest, updateOrganizationsRequest } from '../../api';

type OrganizationFormInput = {
  organization: {
    id?: number;
    name: string;
  };
};

const OrganizationForm: React.FC<OrganizationFormInput> = ({ organization }) => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const history = useHistory();

  const [nameState, setNameState] = React.useState(organization.name || '')

  async function handleSubmitForm(e: React.SyntheticEvent) {
    e.preventDefault();
    try {
      const target = e.target as typeof e.target & {
        name: { value: string };
      };
      const name = target.name.value;

      if(!organization.id){
        await saveOrganizationsRequest({ name });
      }else{
        await updateOrganizationsRequest({id: organization.id, name });
      }
      formRef.current && formRef.current.reset();
      history.push('/organizations');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box sx={{ height: 'inherit', width: 'inherit' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Box sx={{ width: '400px', height: '400px' }}>
          <form onSubmit={handleSubmitForm} ref={formRef}>
            <Box>
              <TextField
                label="name"
                id="name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={nameState}
                onChange={(e) => {
                  setNameState(e.target.value);
                }}
                required
              />
            </Box>
            <Box>
              <Button color="primary" variant="contained" type="submit" size="medium" fullWidth>
                Save
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

const OrganizationPage = () => {
  const params = useParams<{ id: string }>();

  const [organization, setOrganization] = React.useState({ name: '' });

  async function getOrganization() {
    const org = await getOrganizationsRequest(params.id);
    setOrganization(org);
  }

  React.useEffect(() => {
    if (params.id) {
      getOrganization();
    }
  }, []);

  if (params.id && !organization.name) return <p>Loading...</p>;

  return (
    <Box sx={{ height: 'inherit', width: 'inherit' }}>
      <Typography variant="h3" gutterBottom>
        Organization form
      </Typography>
      <Box sx={{ height: '80%' }}>
        <OrganizationForm organization={organization} />
      </Box>
    </Box>
  );
};

export default OrganizationPage;
