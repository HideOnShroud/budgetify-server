FROM node:20.11.0-alpine

RUN addgroup app && adduser -S -G app app
USER app

WORKDIR /app

COPY package*.json ./
USER root

RUN chown -R app:app .

USER app 
RUN npm i

COPY . .

USER root
RUN chown -R app:app ./dist
USER app


ENV port=8000
EXPOSE 8000

CMD ["npm", "run", "serve"]
