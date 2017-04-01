FROM ubuntu:16.04

# Create app directory
ARG APP_DIR=/usr/src/app
RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR

# Bundle app source
COPY . $APP_DIR

RUN apt-get update && \
    apt-get --yes install \
    	 motion && \
    apt-get clean

RUN chmod 777 /usr/src/app/Camera1
RUN chmod 777 /usr/src/app/Camera2

ENTRYPOINT cd /usr/src/app && motion
