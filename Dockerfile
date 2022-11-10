FROM node:latest
ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
WORKDIR /app
ADD . /app
RUN npm install
EXPOSE 443
CMD ["npm", "start"]
