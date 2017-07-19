FROM mhart/alpine-node:8.1.3

RUN mkdir -p /code
WORKDIR /code

# Copy files
COPY .babelrc package.json pm2.prod.json webpack.config.js /code/
COPY src /code/src

# Install deps and build
RUN npm install && \
    npm run build:prod && \
    npm prune --production && \
    npm cache clean --force

# Run the service
CMD ["npm", "run", "serve:prod"]

EXPOSE 3000
