import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Typography,
  CardContent,
  IconButton,
  InputAdornment,
  CardMedia,
  Grid,
  CardActions,
  Modal,
  Paper,
  Box,
  Menu,
  MenuItem,
} from '@mui/material';
import { useGlobalContext } from '../contexts/context2';
import { useNavigate, Link } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Post = ({ post, img, handleConnect, handleDelete }) => {
  const { token, setLink, link } = useGlobalContext();
  const navigate = useNavigate();

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [moreButtonAnchor, setMoreButtonAnchor] = useState(null);

  const handleDeleteIcon = () => {
    // Open the delete confirmation modal
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirmed = () => {
    // Close the delete confirmation modal and perform the delete action
    setDeleteModalOpen(false);
    console.log('Deleted');
    console.log(post._id);
    handleDelete(post._id);
  };

  const handleDeleteCanceled = () => {
    // Close the delete confirmation modal without performing the delete action
    setDeleteModalOpen(false);
  };

  const handleMoreClick = (event) => {
    setMoreButtonAnchor(event.currentTarget);
  };

  const handleMoreClose = () => {
    setMoreButtonAnchor(null);
  };

  const styles = {
    modalContainer: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'white',
      padding: '20px',
      width: '300px',
      fontFamily: 'Poppins, sans-serif',
      fontSize: '5px',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '20px',
    },
    button: {
      margin: '5px',
    },
    customButton: {
      border: '2px solid #1976d2',
      color: '#1976d2',
      margin: '5px',
      backgroundColor: 'unset',
      '&:hover': {
        backgroundColor: 'transparent',
        boxShadow: 'none', // Remove the shadow on hover
      },
    },
  };

  const handleSome = () => {
    if (post.connector === 'Azure') {
      handleConnect({
        connector: post.connector,
        url: post.url,
        name: post.username,
        password: post.password,
        tenant: post.tenant,
      });
    } else {
      handleConnect({
        connector: post.connector,
        url: post.url,
        name: post.username,
        password: post.password,
      });
    }
  };

  const handleDetail = (id, connect) => {
    if (connect === 'Zabbix') {
      navigate(`/hosts/${id}`);
    } else if (connect === 'Kibana') {
      setLink(post.url);
      console.log(link);
      navigate('/kibanadash');
    }
  };

  useEffect(() => {
    console.log(token);
  }, [token]);

return (
    <>
      <Card sx={{ minWidth: 210, position: 'relative', padding: '9px', backgroundColor: '#f3f3f3' }}>
        {/* Three-dot menu (conditionally rendered for Zabbix, AWS, and Azure) */}
        {(post.connector === 'Zabbix' || post.connector === 'AWS' || post.connector === 'Azure') && (
          <>
            <IconButton
              sx={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                color: 'white',
              }}
              onClick={handleMoreClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={moreButtonAnchor}
              open={Boolean(moreButtonAnchor)}
              onClose={handleMoreClose}
            >
              {/* Delete option in the menu */}
              <MenuItem
                onClick={() => {
                  handleDeleteIcon();
                  handleMoreClose();
                }}
              >
                Delete
              </MenuItem>
            </Menu>
          </>
        )}
        {/* Rest of the code remains the same */}
        <CardMedia sx={{ paddingTop: '65%', borderRadius: '10px' }} image={img} title={post.connector} />
        <CardContent sx={{ padding: '7px 12px' }}>
          <Typography gutterBottom component="div">
            <span
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 'bold',
                fontSize: '14px',
                display: 'inline-block',
                padding: '5px 15px',
                border: '2px solid #d35fdd',
                borderRadius: '20px',
                background: 'linear-gradient(to right, #d35fdd, #e79ced)',
              }}
            >
              {post.connector}
            </span>
          </Typography>

          <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px' }} variant="body2" color="text.secondary">
            {post.account}
          </Typography>
        </CardContent>
        <CardActions>
          {(post.connector === 'Azure' || post.connector === 'AWS') && (
            <>
              <Button
                size="small"
                color="primary"
                variant="contained"
                fullWidth // This ensures the button takes the full width
                onClick={handleSome}
              >
                {token ? 'Connected' : 'Connect'}
              </Button>
            </>
          )}
          {post.connector !== 'Azure' && post.connector !== 'AWS' && (
            <Button size="small" color="primary" variant="contained" onClick={handleSome}>
              {post.connector === 'AWS' || post.connector === 'Azure' ? 'Connect' : token ? 'Connected' : 'Connect'}
            </Button>
          )}
          {(post.connector === 'Zabbix' || post.connector === 'Kibana') && (
            <Button
              size="small"
              color="secondary"
              variant="contained"
              disabled={token || post.connector === 'Kibana' || post.connector === 'AWS' || post.connector === 'Azure' ? false : true}
              onClick={() => handleDetail(post._id, post.connector)}
            >
              View Data
            </Button>
          )}
        </CardActions>
      </Card>

      <Modal open={isDeleteModalOpen} onClose={handleDeleteCanceled}>
        <Paper sx={styles.modalContainer}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Delete Account
          </Typography>
          <Typography variant="body1">Are you sure you want to delete this account?</Typography>
          <Box sx={styles.buttonContainer}>
            <Button sx={styles.button} variant="contained" color="primary" onClick={handleDeleteConfirmed}>
              Yes
            </Button>
            <Button sx={styles.customButton} variant="contained" onClick={handleDeleteCanceled}>
              No
            </Button>
          </Box>
        </Paper>
      </Modal>
    </>
  );
};

export default Post;
