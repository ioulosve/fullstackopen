docker run --name mymongo \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=mongoadmin \
    -e MONGO_INITDB_ROOT_PASSWORD=secret \
    -v mongo-volume:/data/db \
    -d \
    --rm \
    mongo:latest 