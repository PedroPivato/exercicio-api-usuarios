# install-and-test.ps1

# Defina o diretório de trabalho como o diretório do workspace
Set-Location -Path $env:WORKSPACE

# Instalar dependências usando npm
D:\node_modules\npm\bin\npm-cli.js install

# Executar o comando cy:run-ci usando npm
D:\node_modules\npm\bin\npm-cli.js run cy:run-ci
