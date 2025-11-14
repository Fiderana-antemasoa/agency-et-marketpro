@echo off
echo Configuration de l'environnement Marketplace...

echo.
echo 1. Copie du fichier .env.example vers .env...
copy .env.example .env

echo.
echo 2. Generation de la cle d'application...
php artisan key:generate

echo.
echo 3. Configuration terminee!
echo.
echo IMPORTANT: Editez maintenant le fichier .env pour configurer la base de donnees:
echo - DB_CONNECTION=mysql
echo - DB_HOST=127.0.0.1
echo - DB_PORT=3306
echo - DB_DATABASE=marketplace_db
echo - DB_USERNAME=root
echo - DB_PASSWORD=votre_mot_de_passe
echo.
pause
