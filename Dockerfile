# Verwenden eines offiziellen Node-Images als Eltern-Image
FROM node:alpine

# Setzen des Arbeitsverzeichnisses im Container
WORKDIR /app

# Kopieren der App-Quelldateien in den Container
COPY . .

# Installieren der App-Abhängigkeiten
RUN npm install

# Bauen der App für die Produktion
RUN npm run build

# Installieren von `serve` zum Ausführen der Produktionsbuild
RUN npm install -g serve

# Anweisung zum Ausführen der App
CMD ["serve", "-s", "build", "-l", "3000"]

# Exponieren des Ports, auf dem der Container läuft
EXPOSE 3000
