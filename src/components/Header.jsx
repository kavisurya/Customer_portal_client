import React from 'react';
import {Breadcrumbs} from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import './Test.css'

const Header = ({title ,bread}) => (
  <div className="mb-5">
   
    {/*{bread?.map((i) => {
      return (
      <span className="text-lg text-gray-400">{i+"/"}</span>
      )
    })}*/}
   <Breadcrumbs aria-label="breadcrumb">

    {bread?.map((i) => {
      return (

        <Link className="underline-on-hover" to={`/${i.nav}`}>
          {i.value}
        </Link>
     
      )
    })}
     </Breadcrumbs>
        {/*<Link underline="hover" color="inherit" href="/">
          MUI
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          Core
        </Link>
        <Typography color="text.primary">Breadcrumbs</Typography>*/}
   
    <p className="text-3xl font-extrabold tracking-tight text-slate-900">
      {title}
    </p>
  </div>
);

export default Header;