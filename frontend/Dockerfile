FROM node:alpine
# EXPOSE 3000
ENV PORT 3000

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY ./ ./

ENV NODE_ENV production

RUN npm run build

CMD ["npm", "run", "start"]
