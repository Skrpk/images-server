FROM node

WORKDIR /usr/src/app

COPY . .

EXPOSE 3000

CMD ["./start.sh"]
