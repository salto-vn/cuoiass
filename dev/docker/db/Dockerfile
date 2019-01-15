FROM mysql:5.7
ARG CONF_DIR=./docker/db/conf

COPY ${CONF_DIR}/my.cnf /etc/mysql/conf.d/my.cnf
#
COPY ./docker/db/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN `chmod 775 /usr/local/bin/docker-entrypoint.sh`