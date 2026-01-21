@echo off
echo ==========================================
echo       INICIANDO FUENTE VIVA
echo ==========================================
echo.
echo 1. Iniciando servidor web...
echo 2. Abriendo navegador en http://localhost:3000
echo.
echo Por favor, no cierres esta ventana mientras uses la pagina.
echo Si el navegador muestra un error de conexion, espera unos segundos y recarga la pagina.
echo.

start http://localhost:3000
cmd /k "npm run dev"
