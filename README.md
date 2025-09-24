# 🎬 Despliegue de la aplicación **CINE25** con Nginx en Docker

En esta práctica se ha desplegado la aplicación **CINE2025** dentro de un contenedor **Nginx** usando **Docker**.  
El objetivo era tener la aplicación accesible desde el navegador en `http://localhost:8080`.

---

## 🚀 Pasos realizados

### 1. Arrancar contenedor de Nginx
Se utilizó la imagen oficial de Nginx para levantar un contenedor:

docker run -d --name focused_napier -p 8080:80 nginx

Esto permitió acceder a la página por defecto de Nginx.


### 2️⃣ Copiar la aplicación al contenedor

La aplicación se encontraba en la ruta local:

C:\Users\cole\Desktop\DAM2\SGE\UD1\CINE25\CINE2025CURSO0GIT-main


Inicialmente cometí un error porque el archivo principal se llamaba ventaentradas.html.
Para que Nginx lo sirviera correctamente lo renombré a index.html.

🔹 Eliminar archivos por defecto de Nginx
docker exec -it focused_napier sh -c "rm -rf /usr/share/nginx/html/*"

<img width="886" height="183" alt="image" src="https://github.com/user-attachments/assets/fe51c495-a475-4ac8-ba77-6116c7e04288" />


🔹 Copiar la aplicación dentro del contenedor
docker cp "C:\Users\cole\Desktop\DAM2\SGE\UD1\CINE25\CINE2025CURSO0GIT-main\." focused_napier:/usr/share/nginx/html/

<img width="886" height="197" alt="image" src="https://github.com/user-attachments/assets/51a124d3-564a-4b3b-bec6-35806232a615" />


### 3️⃣ Recargar Nginx

Para aplicar los cambios recargamos la configuración de Nginx:

docker exec -it focused_napier nginx -s reload


### 4️⃣ Resultado final 

Al acceder a:

👉 http://localhost:8080

se muestra correctamente nuestra aplicación CINE25 servida desde el contenedor Nginx:

<img width="886" height="507" alt="image" src="https://github.com/user-attachments/assets/48ac3dc8-0600-4a39-b899-2eeaa8429d2d" />


### 📝 Notas

Es importante que el archivo de entrada principal se llame index.html para que Nginx lo muestre por defecto.

Si se cambia la aplicación, hay que repetir el proceso de copiar los archivos y recargar Nginx.

También podría usarse un volumen en lugar de docker cp para trabajar de forma más ágil en local.

