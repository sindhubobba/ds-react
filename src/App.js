import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { Grid } from 'react-loading-icons'
import axios from 'axios';
import { RegisteredUsersTable } from './views/RegisteredUsersTable';

const config = {
  registeredUserURL: 'https://5c3ce12c29429300143fe570.mockapi.io/api/registeredusers',
  unRegisteredURL: 'https://5c3ce12c29429300143fe570.mockapi.io/api/unregisteredusers',
  projectMembershipURL: 'https://5c3ce12c29429300143fe570.mockapi.io/api/projectmemberships'
};

function App() {
  const [registeredUsers, setRegisteredUsers] = useState(null);
  const [unRegisteredUsers, setUnRegisteredUsers] = useState(null);
  const [projectMemberships, setProjectMemberships] = useState(null);
  const [readyToRender, setReadyToRender] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fn = async () => {
      error && setError(false);
      const { data, status } = await axios.get(config?.registeredUserURL);
      if (status === 200 && data?.length > 0)
        setRegisteredUsers(data);
      else
        setError(true);

    }

    void fn();
  }, [error]);

  useEffect(() => {
    const fn = async () => {
      error && setError(false);
      const { data, status } = await axios.get(config?.unRegisteredURL);
      if (status === 200 && data?.length > 0)
        setUnRegisteredUsers(data);
      else
        setError(true);
    }

    void fn();
  }, [error]);

  useEffect(() => {
    const fn = async () => {
      error && setError(false);
      const { data, status } = await axios.get(config?.projectMembershipURL);
      if (status === 200 && data?.length > 0)
        setProjectMemberships(data);
      else
        setError(true);
    }

    void fn();
  }, [error]);

  useEffect(() => {
    if (!registeredUsers || !unRegisteredUsers || !projectMemberships) return;

    const userProjectMap = projectMemberships.reduce((acc, currentValue) => {
      if (acc[currentValue.userId]) {
        acc[currentValue.userId].projectIds.push(currentValue.projectId)
      } else {
        acc[currentValue.userId] = { projectIds: [] };
        acc[currentValue.userId].projectIds = [currentValue.projectId];
      }
      return acc;
    }, {});

    registeredUsers.forEach(user => {
      if (userProjectMap[user.id]) {
        user.projectIds = userProjectMap[user.id].projectIds;
      }
    })
    unRegisteredUsers.forEach(user => {
      if (userProjectMap[user.id]) {
        user.projectIds = userProjectMap[user.id].projectIds;
      }
    })
    setReadyToRender(true);
  }, [projectMemberships, registeredUsers, unRegisteredUsers]);

  return (
    <div className="App">
      {error && 'Failed to load data. Please try again.'}
      {readyToRender ? <RegisteredUsersTable data={registeredUsers} /> : <Grid fill="#c2c0c0" />}

    </div>
  );
}

export default App;
