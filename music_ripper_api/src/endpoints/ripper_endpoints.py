import os
import secrets
from fastapi import APIRouter, Form, HTTPException, Request, Depends, Response
from src.api_code.music_ripper import download_playlist

router = APIRouter()
session_ids = []

def verify_cookie(request: Request):
    global session_ids
    # Extract the cookie from the request
    cookie = request.cookies.get('session_id')
    # Check if the cookie is present and valid
    if not cookie or not int(cookie) in session_ids:
        # If the cookie is invalid or not present, return an HTTP error
        raise HTTPException(status_code=401, detail="Unauthorized")

@router.post('/download-playlist')
async def api_download_playlist(url: str = Form(...), dependency=Depends(verify_cookie)):
    result = await download_playlist(url)
    return result

@router.post('/login')
def login(response: Response, username: str = Form(...), password: str = Form(...)):
    print(f'Attempted login: Username: {username} Password: {password}')
    if username == os.environ['USERNAME'] and password == os.environ['PASSWORD']:
        global session_ids
        session_id = secrets.randbits(64)
        session_ids.append(session_id)
        content = {"message": "Cookie is set"}
        response.set_cookie(
            key="session_id",
            value=session_id,
            max_age=1800,
            httponly=True, 
            secure=False, 
            samesite='Strict'
        )
        return content
    else:
        raise HTTPException(status_code=401, detail="Unauthorized: Incorrect username or password")
