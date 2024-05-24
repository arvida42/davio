# Davio

Selfhosted Stremio addon that resolve streams using WebDAV

## Automatic installation using cli script (recommended)

The cli script will install, configure, secure and update your addon. **Docker must be installed on your machine for the automatic installation.**

Three automatic installation options are available using cli script:

- 1) **Traefik** (recommended) - 
 You must have a domain configured for this machine, ports 80 and 443 must be opened.
 Your Addon will be available on the address: `https://your_domain`
 You can use [noip](https://www.noip.com) to create a free domain.

- 2) **Localtunnel** - 
 This installation use "[localtunnel](https://localtunnel.me/)" to expose the app on Internet.
 There's no need to configure a domain; you can run it directly on your local machine.
 However, you may encounter limitations imposed by LocalTunnel.
 All requests from the addons will go through LocalTunnel.
 Your Addon will be available on the address like `https://random-id.localtunnel.me`

- 3) **Local** - 
 Install locally without domain. Stremio App must run in same machine to work.
 Your Addon will be available on the address: `http://localhost`


```sh
# Create the directory where you want to store the installation configs
mkdir /home/davio && cd /home/davio

# Download the cli script
curl -fsSL https://raw.githubusercontent.com/arvida42/davio/main/cli.sh -o cli.sh

# Run the install
chmod +x ./cli.sh && ./cli.sh install
```


### cli scripts commands details
```sh
# Install all containers and configure them
./cli.sh install

# Update all containers to the last version
./cli.sh update

# Stop all containers
./cli.sh stop

# Start all containers
./cli.sh start

# Stop and remove all containers.
./cli.sh down
```

## Manual installation

```sh
# Clone the repo
git clone https://github.com/arvida42/davio.git

# Go inside the folder
cd davio

# Install dependencies
npm install

# Run
npm start
```

## Manual installation with Docker image

```sh
# Create env file
touch .env

# Add settings to env file, change these settings with yours
# See configuration below
echo "ADDON_NAME=Cool Name" >> .env

# Create data volume
docker volume create davio_data

# Run the container
docker run --env-file .env \
    -v davio_data:/data \
    -e DATA_FOLDER=/data \
    --name davio \
    -p 4000:4000 \
    -d arvida42/davio:latest
```

## Configuration

Davio is designed for selfhosted, whether for personal or public use. As a server owner, effortlessly configure many settings with environement variables.

- **Addon ID** `ADDON_ID` Change the `id` field in stremio manifest
- **Addon Name** `ADDON_NAME` Change the `name` field in stremio manifest
- And mores ..., see all configurations in [config.js file](https://github.com/arvida42/davio/blob/main/src/lib/config.js).