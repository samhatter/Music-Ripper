WebUI that rips music from YT to server using yt-dlp

React Frontend, Python FastAPI Backend

To run just docker compose up, write your env files, and change the compose file to have more sensible environment variables and ports for your use case

Include a .secrets.env in the root folder with a USERNAME and PASSWORD like so

```
USERNAME=username
PASSWORD=password
```

Inlcude a .env in the music_ripper_ui that specifies the endpoint to your backend 

```
REACT_APP_URL=(ex. backend.samantha-home-server.net)
```
