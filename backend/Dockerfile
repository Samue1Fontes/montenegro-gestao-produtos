# Imagem base do Node.js versão 20 leve
FROM node:20-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências primeiro
# Isso aproveita o cache do Docker — se package.json não mudar, não reinstala tudo
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Compila o TypeScript para JavaScript
RUN npm run build

# Copia o products.json para dentro da pasta dist após o build
RUN cp -r src/data dist/data

# Expõe a porta que o backend usa
EXPOSE 3333

# Comando para iniciar o servidor compilado
CMD ["node", "dist/server.js"]