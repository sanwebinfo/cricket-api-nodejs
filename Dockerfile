FROM node:21-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 3000
CMD [ "node", "index.js" ]