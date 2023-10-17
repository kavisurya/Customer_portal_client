import React, { useState, useEffect } from 'react';
import { Header } from '../../components';
import { FaAws, FaQuora, FaUser } from 'react-icons/fa';
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { VscAzure } from 'react-icons/vsc';
import { useGlobalContext } from '../../contexts/context2';
import {
  Container,
  Button,
  Typography,
  Avatar,
  InputAdornment,
  TextField,
  IconButton,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import AzureImg from '../../data/cost/azure.png';
import AwsImg from '../../data/cost/aws.jpg';
import GoogleImg from '../../data/cost/gcp.jpg';
import Digiverz from '../../data/cost/Digiverz.png';
import Personal from '../../data/cost/personal.png';
import Maadaniyah from '../../data/cost/maadaniyah.png';
import Tanmiah from '../../data/cost/tanmiah.jpg';

const CostManage = () => {
  const navigate = useNavigate();

  const { setService12 } = useGlobalContext();

  const [service, setService] = useState([
    {
      Service: 'AWS',
      Icon: <FaAws />,
      BackgroundImage: `url(${AwsImg})`,
    },
    {
      Service: 'Azure',
      Icon: <VscAzure />,
      BackgroundImage: `url(${AzureImg})`,
    },
    {
      Service: 'GCP',
      Icon: <GoogleIcon />,
      BackgroundImage: `url(${GoogleImg})`,
    },
  ]);

  const [customer, setCustomer] = useState([
    {
      Customer: 'Tanmiah',
      Icon: <MdOutlineSupervisorAccount />,
      BackgroundImage: `url(${Tanmiah})`,
    },
    {
      Customer: 'Maadaniyah',
      Icon: <MdOutlineSupervisorAccount />,
      BackgroundImage: `url(${Maadaniyah})`,
    },
    {
      Customer: 'Personal',
      Icon: <MdOutlineSupervisorAccount />,
      BackgroundImage: `url(${Personal})`,
    },
    {
      Customer: 'DigiVerZ',
      Icon: <MdOutlineSupervisorAccount />,
      BackgroundImage: `url(${Digiverz})`,
    },
  ]);

  const handleService = (val) => {
    if (val === 'AWS' || val === 'Azure' || val === 'GCP') {
      setService12({ name: 'Service', val: val });
      navigate('/costservices');
    } else {
      setService12({ name: 'Customer', val: val });
      navigate('/costservices');
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header title="Cost Management" bread={[{ value: 'Dashboard', nav: 'dashboard' }, { value: 'Cost', nav: 'CostManagement' }]} />

      <div className="App">
        <div className="Services">
          <h1 className="text-2xl mb-4">By Services</h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {service.map((i) => (
              <Card key={i.Service} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div className="w-2/5" style={{ backgroundImage: i.BackgroundImage, backgroundSize: 'cover', backgroundPosition: 'center', height: '100%' }}></div>
                <div className="w-3/5">
                  <CardContent style={{ padding: 0 }}>
                    <Button
                      sx={{
                        backgroundColor: '#3cb1ff',
                        color: '#ffffff',
                        height: '100%',
                        margin: 0,
                        padding: '1.5rem',
                        borderRadius: '0', // Remove border radius
                      }}
                      variant="contained"
                      startIcon={i.Icon}
                      fullWidth
                      onClick={() => handleService(i.Service)}
                    >
                      {i.Service}
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <div className="Customers mt-6">
          <h1 className="text-2xl mb-4">By Customers</h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {customer.map((i) => (
              <Card key={i.Customer} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div className="w-2/5" style={{ backgroundImage: i.BackgroundImage, backgroundSize: 'cover', backgroundPosition: 'center', height: '100%' }}></div>
                <div className="w-3/5">
                  <CardContent style={{ padding: 0 }}>
                    <Button
                      sx={{
                        backgroundColor: '#3cb1ff',
                        color: '#ffffff',
                        height: '100%',
                        margin: 0,
                        padding: '1.5rem',
                        borderRadius: '0', // Remove border radius
                      }}
                      variant="contained"
                      startIcon={i.Icon}
                      fullWidth
                      onClick={() => handleService(i.Customer)}
                    >
                      {i.Customer}
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostManage;
