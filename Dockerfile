FROM node

RUN mkdir /app
COPY . /app
WORKDIR /app

RUN npm i

CMD [ "npm", "start" ]