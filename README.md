## Gerência de Redes Distribuída com Node.js e Python
Este projeto demonstra uma solução para \textbf{gerência de redes distribuída}, utilizando a capacidade de orquestração do \textbf{Node.js} e a versatilidade de execução de scripts do \textbf{Python}. Ele permite a execução remota de comandos e scripts Python em um servidor backend, útil para tarefas como verificações de conectividade, inspeção de sistemas de arquivos e leitura de logs.

🚀 Como Funciona?
A arquitetura se baseia na comunicação \textbf{RESTful} via HTTP:

Um \textbf{cliente} (como Postman ou Insomnia) envia uma requisição \texttt{POST} contendo código Python para a API Node.js.

A aplicação \textbf{Node.js} (com Express e Axios) recebe essa requisição e a repassa para o servidor Flask em Python.

A aplicação \textbf{Flask} (Python) salva o código Python recebido em um arquivo temporário e o executa usando \texttt{subprocess.run()}.

A saída (ou erros) da execução do script é capturada pelo Flask e retornada para o Node.js.

O \textbf{Node.js} retransmite essa resposta para o cliente original.

✨ Tecnologias Utilizadas
Node.js / Express: Orquestração da API e comunicação inicial.

Python / Flask: Backend para execução de código Python e interação com o sistema operacional.

Axios: Cliente HTTP para comunicação do Node.js com o Flask.

Postman / Insomnia: Ferramentas para testar a API.

⚙️ Configuração do Ambiente
Para configurar e rodar este projeto, você precisará ter Node.js e Python instalados.

1. Pré-requisitos
Node.js e npm: Baixe e instale a versão LTS recomendada em nodejs.org. O npm vem junto.

Python e pip: Baixe e instale a versão mais recente do Python 3 em python.org. Marque a opção "Add Python to PATH" durante a instalação no Windows.

2. Configuração da Aplicação Flask (Python Backend)
Crie uma pasta principal para o projeto (ex: gerencia-redes-distribuida).

Dentro dela, crie a pasta flask_app.

Navegue até a pasta flask_app no seu terminal:

Bash

cd flask_app
Crie e ative um ambiente virtual (recomendado):

Windows (PowerShell):

PowerShell

python -m venv venv
.\venv\Scripts\activate
Windows (CMD):

DOS

python -m venv venv
venv\Scripts\activate
Linux/macOS:

Bash

python3 -m venv venv
source venv/bin/activate
Instale o Flask:

Bash

pip install Flask
Crie o arquivo app.py (o código completo está na documentação detalhada do projeto).

Inicie o servidor Flask:

Bash

python app.py
O servidor estará rodando em http://localhost:5000.

3. Configuração da Aplicação Node.js (Frontend API)
Dentro da pasta principal do projeto (gerencia-redes-distribuida), crie a pasta node_app.

Navegue até a pasta node_app no seu terminal:

Bash

cd node_app
Inicialize o projeto Node.js:

Bash

npm init -y
Instale as dependências (Express e Axios):

Bash

npm install express axios
Crie o arquivo server.js (o código completo está na documentação detalhada do projeto).

Inicie o servidor Node.js:

Bash

node server.js
O servidor estará rodando em http://localhost:3000.

🧪 Testando a API com Postman/Insomnia
Recomendamos fortemente o uso de ferramentas gráficas para testes, pois elas simplificam a formatação de requisições JSON complexas e evitam problemas de escape de caracteres em terminais.

Postman: Baixe em postman.com/downloads/

Insomnia: Baixe em insomnia.rest/download/

Exemplo de Requisição
No Postman/Insomnia, crie uma nova requisição POST.

URL: http://localhost:3000/run_python_script

Headers: Adicione Content-Type: application/json

Body: Selecione raw e o tipo JSON. Cole o código Python que deseja executar dentro da propriedade "code".

Exemplo: Ping para 8.8.8.8
JSON

{
    "code": "import subprocess\\nimport platform\\n\\ntarget_ip = \\"8.8.8.8\\"\\nparam = \\"-n 1\\" if platform.system().lower() == \\"windows\\" else \\"-c 1\\"\\n\\nif platform.system().lower() == \\"windows\\":\\n    command = f\\"ping {param} {target_ip}\\\"\\n    shell_mode = True\\nelse:\\n    command = [\\"ping\\", param, target_ip]\\n    shell_mode = False\\n\\ntry:\\n    result = subprocess.run(\\n        command,\\n        capture_output=True,\\n        text=True,\\n        shell=shell_mode,\\n        timeout=10,\\n        encoding=\\"utf-8\\",\\n        errors=\\"ignore\\"\\n    )\\n    \\n    if result.returncode == 0:\\n        print(f\\"Ping para {target_ip} (SUCESSO):\\\\n{result.stdout}\\\\n\\")\\n    else:\\n        print(f\\"Ping para {target_ip} (FALHA - Código de saída: {result.returncode}):\\\\n{result.stderr}\\\\n{result.stdout}\\\\n\\")\\n\\nexcept subprocess.TimeoutExpired:\\n    print(f\\"Erro: O comando ping para {target_ip} excedeu o tempo limite.\\")\\nexcept FileNotFoundError:\\n    print(f\\"Erro: O comando \\'ping\\' não foi encontrado. Verifique se está no PATH.\\")\\nexcept Exception as e:\\n    print(f\\"Um erro inesperado ocorreu ao executar o ping: {e}\\\\n\\")"
}
📜 Mais Exemplos de Comandos
Você pode substituir o código Python no campo "code" por outros scripts:

Listar Conteúdo do Diretório:

JSON

{
    "code": "import os\\n\\nprint(\\"Conteúdo do diretório atual onde o script Python está sendo executado:\\")\\nprint(os.listdir(\\".\\"))"
}
Ler um Arquivo de Log (crie testelogs.txt na pasta flask_app com algum conteúdo):

JSON

{
    "code": "try:\\n    with open(\\"testelogs.txt\\", \\"r\\") as f:\\n        content = f.read()\\n        print(\\"Conteúdo de testelogs.txt:\\\\n\\" + content)\\nexcept FileNotFoundError:\\n    print(\\"Erro: testelogs.txt não encontrado na pasta do aplicativo Flask.\\")\\nexcept Exception as e:\\n    print(f\\"Erro ao ler o arquivo testelogs.txt: {e}\\")"
}
⚠️ Considerações de Segurança
É crucial entender que este projeto, em sua forma atual, permite a execução de \textbf{código Python arbitrário} no servidor. Para um ambiente de produção, medidas de segurança robustas são obrigatórias, incluindo autenticação, autorização, validação rigorosa de entrada e isolamento de ambientes de execução.
