# Proyecto-BD
Proyecto final de Bases de Datos
##Inicialización
Una vez dentro de la carpeta raíz del proyecto procedemos a crear el contenedor para la base de datos (debe tener Docker en ejecución):
```sh
cd database
docker build -t imagen_proyecto .
docker run --name contenedor_proyecto -p 5432:5432 -e POSTGRES_PASSWORD=pg123 -d imagen_proyecto
```
Despues de crear el servidor de la base de datos mediante la conexión al contenedor, debemos tener unos aspectos en cuenta que se debe actualizar la dirección ip y la contraseña de la base de datos (en caso de no haber usado la del documento)
