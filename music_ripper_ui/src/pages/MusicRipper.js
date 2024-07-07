import React, {useState} from 'react';
import Button  from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import WallpaperArt from '../utils/WallpaperArt';

function MusicRipper() {
  const [downloadURL, setDownloadURL] = useState('');
  const url = process.env.REACT_APP_URL;
  
  const handleDownloadPlaylist = async () => {
    const formData = new FormData();
    formData.append('url', downloadURL);
    setDownloadURL('')
    
    const response = await fetch(`${url}/download-playlist`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: formData,
      credentials: 'include',
    });

    if (response.ok) {
      alert('Server Finished')
    } else {
      alert('Download Failed');
    }
  }
  
  return (
    <div>
      <WallpaperArt/>
      <Container>
        <Box
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            padding: 2,
            background: 'white',
            border: '1px solid gray',
            borderRadius: '8px',
          }}
        >
          <div>
            <Stack spacing={2} direction="column">
              <TextField
                  id="playlist_url"
                  label="playlist url"
                  type = "text"
                  value = {downloadURL}
                  onChange={(e) => setDownloadURL(e.target.value)}
                  autoFocus
                />
              <Button variant="contained" onClick={handleDownloadPlaylist}>Download Playlist</Button>
            </Stack>
          </div>
        </Box>
      </Container>
    </div>
  );
}
export default MusicRipper
