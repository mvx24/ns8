FROM node

ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update
RUN apt-get upgrade -y

WORKDIR /opt/ts8-tech-assessment
COPY . .
RUN yarn install --production

ENV NODE_ENV production
EXPOSE 8000
ENTRYPOINT ["node", "/opt/ts8-tech-assessment/index.js"]
