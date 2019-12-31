FROM node:latest

WORKDIR /opt/app
# Install dependencies
ADD package.json .
RUN npm install

# Add sample application
ADD src/ .

EXPOSE 5000

# Run it
CMD node app.js
