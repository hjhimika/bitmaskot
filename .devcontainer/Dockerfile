# Node 18 base image
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-18

# Install Java 17
RUN apt-get update && \
    apt-get install -y openjdk-17-jdk

# Install MySQL server, create a database and user
ARG MYSQL_DATABASE=bitmaskot
ARG MYSQL_USER=bitmaskot
ARG MYSQL_PASSWORD=bitmaskot
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y wget gnupg && \
    cd /tmp && wget https://dev.mysql.com/get/mysql-apt-config_0.8.22-1_all.deb && \
    dpkg -i mysql-apt-config*.deb && \
    rm mysql-apt-config*.deb && \
    apt-get update && apt-get install -y mysql-server
# VOLUME [ "/var/lib/mysql" ]
# RUN mysqld --initialize-insecure --user=root --datadir=/var/lib/mysql && \
    # mysql -u root -e "CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE};" && \
    # mysql -u root -e "CREATE USER IF NOT EXISTS '${MYSQL_USER}'@'localhost' IDENTIFIED BY '${MYSQL_PASSWORD}';" && \
    # mysql -u root -e "GRANT ALL PRIVILEGES ON ${MYSQL_DATABASE}.* TO '${MYSQL_USER}'@'localhost';" && \
    # mysql -u root -e "FLUSH PRIVILEGES;"
# CMD [ "mysqld", "--user=root", "--datadir=/var/lib/mysql" ]