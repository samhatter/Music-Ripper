import asyncio

async def download_playlist(url: str):
    yt_dlp = await asyncio.create_subprocess_exec(
            'yt-dlp_linux',
            '--audio-format',
            'best',
            '-x',
            '-c',
            '-o',
            r"""/output_dir/%(playlist)s/%(title)s.%(ext)s""",
            url
           )
    await yt_dlp.wait()
    return
