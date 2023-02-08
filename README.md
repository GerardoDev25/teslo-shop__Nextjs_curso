# Next.js TesloShop

para correr se necesita la base de datos

```
docker-compose up -d
```

mongodb url local

```
mongodb://localhost:27017/teslodb
```

## configurar las variables de entorno
renombrar el archivo __env.template__ a __.env__

## llenar la base de datos de pruebas 

llamar : 
```
  http://localhost:3000/api/seed
```