@echo off
setlocal
echo ==========================================
echo    REINICIO LIMPIO - FUENTE VIVA ⛲
echo ==========================================
echo.

echo 1. Cerrando servidores anteriores para evitar bloqueos...
:: Mata procesos de node que esten ejecutando next o npm en esta carpeta
taskkill /F /FI "IMAGENAME eq node.exe" /FI "WINDOWTITLE eq npm*" /T 2>nul
taskkill /F /FI "IMAGENAME eq node.exe" /FI "WINDOWTITLE eq next*" /T 2>nul

echo 2. Iniciando servidor web limpio...
echo.
echo Por favor, no cierres esta ventana.
echo Abriendo http://localhost:3000...

start http://localhost:3000
npm run dev

pause
