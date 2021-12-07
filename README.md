# BOM App Frontend

1. Create a Docker Image:
    - `docker build -t bom-app-fe .`
2. Run the Docker Container:
    - `docker run -d -it -p 80:80/tcp --name my-app bom-app-fe:latest`

3. See BOM app at browser:
    - `http://localhost/`
