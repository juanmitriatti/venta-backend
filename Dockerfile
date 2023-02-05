FROM node:18-alpine
RUN apk add yarn
WORKDIR /srv/app/
COPY . .
RUN yarn
RUN ls -la
RUN yarn build
# RUN yarn typeorm migration:run
CMD [ "yarn", "start"]