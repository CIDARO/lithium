FROM node:10

WORKDIR /usr/local/lithium
COPY . ./
RUN npm install
RUN npm install pm2 -g
EXPOSE 8000
CMD ["pm2-runtime", "app.js"]