FROM node:18
WORKDIR /app
COPY package.json /app
COPY . /app
RUN npm run fix
CMD ["npm", "start"]