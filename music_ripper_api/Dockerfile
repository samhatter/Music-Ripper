FROM python:3.8

RUN mkdir /src
RUN mkdir /output_dir

COPY ./setup.py /
COPY ./start.sh /
COPY ./requirements.txt /
COPY ./src/ /src/

# Conform shell script to linux line endings
RUN sed -i 's/\r//g' /start.sh

RUN pip install --upgrade pip; exit 0
RUN pip install -e .
RUN wget https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp_linux -P /usr/bin && chmod 777 /usr/bin/yt-dlp_linux
RUN apt-get update && apt-get install ffmpeg -y

EXPOSE 80

CMD ["/bin/bash", "/start.sh"]