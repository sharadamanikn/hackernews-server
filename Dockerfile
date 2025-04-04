FROM node:22.1.0

WORKDIR /app

ARG JWT_SECRET_KEY
ARG DATABASE_URL
ARG DIRECT_URL

ENV JWT_SECRET_KEY=$JWT_SECRET_KEY
ENV DATABASE_URL=$DATABASE_URL
ENV DIRECT_URL=$DIRECT_URL

COPY . .

RUN npm install

RUN if [ -f "./prisma/schema.prisma" ]; then npx prisma generate; fi

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]