# Seleccionar la imagen
FROM node:20-alpine

ENV NODE_VERSION 21.6.2

# Espacio de trabajo
WORKDIR /app

# Copiamos el archivo package.json
COPY package*.json ./

# Ejecutamos las instalaciones de las dependencias
RUN npm install

# Copiamos los demas archivos que esten en el proyecto
COPY . ./

#Ejecutamos el proyecto
CMD ["npm", "start"]
