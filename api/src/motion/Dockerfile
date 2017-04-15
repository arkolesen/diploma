FROM ubuntu:16.04


RUN apt-get update
RUN apt-get --yes install motion

# Create app directory
ARG APP_DIR=/usr/src/app
RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR

# Bundle app source
COPY . $APP_DIR


ENTRYPOINT cd /usr/src/app && su -c motion -s /bin/sh
