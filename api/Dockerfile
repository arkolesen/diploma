FROM node:6

RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y unzip wget build-essential \
        cmake git pkg-config libswscale-dev \
        python3-dev python3-numpy \
        libtbb2 libtbb-dev libjpeg-dev \
        libpng-dev libtiff-dev libjasper-dev \
        motion
RUN  cd \
        && wget https://github.com/opencv/opencv/archive/2.4.11.zip \
        && unzip 2.4.11.zip \
        && cd opencv-2.4.11 \
        && mkdir build \
        && cd build \
        && cmake .. \
        && make -j3 \
        && make install \
        && cd \
        && rm 2.4.11.zip

 RUN touch /etc/ld.so.conf
 RUN ldconfig

# Create app directory
ARG APP_DIR=/usr/src/app
RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR

# Bundle app source
COPY . $APP_DIR

ENTRYPOINT cd /usr/src/app && npm i && npm start
