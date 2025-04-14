# Proyecto final Backend III

## 🐳 DockerHub

La imagen de este proyecto está disponible en DockerHub en el siguiente enlace:

[🔗 Enlace a la imagen en DockerHub](https://hub.docker.com/repository/docker/matiasmontenegro/proyecto-backend-iii)

## 🚀 Instalación y ejecución con Docker

Para ejecutar el proyecto utilizando Docker, sigue los siguientes pasos:

### 1. Clonar el repositorio
```bash
  git clone https://github.com/MatiasMontenegro08/Proyecto-Backend-III.git
  cd Proyecto-Backend-III
```

### 2. Construir la imagen de Docker
Si deseas construir la imagen localmente en lugar de usar la de DockerHub, ejecuta:
```bash
  docker build -t proyecto-backend-iii .
```

### 3. Ejecutar el contenedor
Para correr la imagen desde DockerHub:
```bash
  docker run -d -p 8080:8080 --name proyecto-final-backend matiasmontenegro/proyecto-backend-iii
```
Si construiste la imagen localmente, usa:
```bash
  docker run -d -p 8080:8080 --name proyecto-final-backend proyecto-backend-iii
```

### 4. Acceder al Proyecto
Una vez que el contenedor está en ejecución, puedes acceder a la aplicación en:
```
http://localhost:8080
```

## 📌 Endpoints principales
Endpoint     |
-------------|
/api/users
/api/pets
/api/adoptions
/api/sessions
/api/mocks

Para más detalles sobre los endpoints y su uso, consulta la documentación: http://localhost:8080/api-docs/#/.

## 🛑 Detener y eliminar el contenedor
Para detener el contenedor:
```bash
  docker stop proyecto-final-backend
```
Para eliminar el contenedor:
```bash
  docker rm proyecto-final-backend
```
