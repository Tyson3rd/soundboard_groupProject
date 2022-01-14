#FROM node:current

#WORKDIR ./

#COPY ./ ./

#RUN npm install

#EXPOSE 8080

#CMD ["npm", "run", "build"]

# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add `/server/node_modules/.bin` to $PATH
ENV PATH /server/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./

CMD ["npm", "run", "build"]

EXPOSE 5500