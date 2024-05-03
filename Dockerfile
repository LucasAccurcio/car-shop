FROM node:18 AS build

WORKDIR /usr/src/app

COPY package-lock.json package.json ./

RUN npm install

COPY . .

RUN npm run build
RUN npm ci

FROM node:18-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

EXPOSE 3001

CMD ["npm ", "run", "start:prod"]