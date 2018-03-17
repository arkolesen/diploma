FROM node:8

# Create app directory
ARG APP_DIR=/usr/src/app
RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR

# Bundle app source
COPY . $APP_DIR


ENTRYPOINT cd /usr/src/app && npm i && npm start
