FROM node:carbon

RUN apt-get update && apt-get install -y --force-yes htop vim nmap iptraf tcpdump dstat ngrep mtr lftp irssi iotop

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install -g knex

RUN yarn install

RUN yarn build

EXPOSE 5000

