import React, { useState } from 'react';
import { Box, Typography, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material'; // Optional: For close icon in modal
import project1 from "../assets/images/project1.jpg"


const Gallery = ({image}) => {
  // State to manage modal open/close
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
console.log("image",image)
  // Function to open modal
  const handleOpen = (imageSrc) => {
    setSelectedImage(imageSrc);
    setOpen(true);
  };
  const url=`https://localhost:5000/upload/${image}`;

  // Function to close modal
  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  return (
    <Box >
      <Box
        component="img"
        src={url}
        crossOrigin='anonymous'
        alt="Description of the image"
        sx={{ width: 400, height: "auto", objectFit: 'cover', cursor: 'pointer', borderRadius: 2 }}
        onClick={() => handleOpen(url)}
      />

      {/* Dialog for Modal Image */}
      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="md" 
        fullWidth 
        sx={{
          overflow: 'hidden', 
          backgroundColor: 'transparent', // Ensure dialog itself is transparent
        }} 
        className="hide-scrollbar"
      >
        <DialogTitle>
          <Typography variant="h6">Image</Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent 
          sx={{
            p: 0, 
            overflow: 'hidden', 
            width: '100%', 
            maxHeight: '80vh', // Prevents overflow vertically
            backgroundColor: 'transparent', // Keep content transparent
          }}
        >
          <Box
            component="img"
            src={selectedImage}
             crossOrigin='anonymous'
            alt="Large Image"
            sx={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain', // Ensure the image scales down without losing aspect ratio
              maxHeight: '80vh', // Limit image height to avoid too large images
              maxWidth: '100%', // Prevent horizontal overflow
              display: 'block', // Ensures image is displayed as a block element
              margin: '0 auto', // Centers the image horizontally
            }}
          />
        </DialogContent>

        <DialogActions>
          {/* You can add action buttons here if needed */}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Gallery;
