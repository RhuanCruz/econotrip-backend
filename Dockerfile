FROM node:22-slim

WORKDIR /app

COPY entrypoint.sh .
COPY tsconfig.json .
COPY package.json .

COPY ./src ./src
COPY ./prisma ./prisma

RUN apt-get update -y && apt-get install -y openssl libssl-dev && rm -rf /var/lib/apt/lists/*
RUN mkdir tmp
RUN mkdir logs
RUN yarn install

EXPOSE ${API_PORT}

CMD ["/bin/bash", "/app/entrypoint.sh"]
