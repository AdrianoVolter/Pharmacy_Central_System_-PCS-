# Pharmacy Central System (PCS)
***
## Gerenciamento de depósitos e medicamentos Projeto avaliativo , modulo 2 back-end 


<p>
  Esse projeto tem como objetivo criar o backend do sistema Pharmacy Central System, a API Pharmacy Central System (PCS), para gerenciar usuários, depósitos e medicamentos , recebendo dados de requisição e inserindo-os no banco de dados postgres com nome de pcsbd e retornando dados necessários. 
  Nessa API podemos:
   <li>Cadastar usuários, fazer login, alterar dados. 
   <li>Cadastrar depósitos alterar dados , listar depósitos, deletar depósitos.
   <li>Cadastrar medicamentos , listar , deletar .
</p>


## Tecnologias utilizadas

<p align="">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=nodejs,express,postgres,sequelize,javascript,git,github,vscode" />
  </a>
</p>
<ol>
<li>Node.js: Plataforma de desenvolvimento que permite executar código JavaScript no servidor e criar aplicações web escaláveis.

<li>Express: Framework web para Node.js que simplifica a criação de APIs e aplicações web, facilitando o tratamento de rotas, middlewares e requisições HTTP.

<li>PostgreSQL: Sistema Gerenciador de Banco de Dados Relacional (SGBD) utilizado para armazenar os dados do projeto, como informações de usuários, depósitos e medicamentos.

<li>Sequelize: ORM (Object-Relational Mapping) que facilita a interação com o banco de dados PostgreSQL, permitindo manipular dados usando objetos JavaScript.

<li>JavaScript (JS): Linguagem de programação utilizada tanto no lado do cliente (navegador) quanto no lado do servidor (Node.js) para implementar a lógica da aplicação.

<li>Git e GitHub: Sistema de controle de versão (Git) usado para rastrear e gerenciar alterações no código-fonte, e plataforma de hospedagem de repositórios (GitHub) utilizada para armazenar e compartilhar o código do projeto.

<li>Visual Studio Code (VSCode): Um editor de código-fonte altamente popular e extensível que é frequentemente usado para desenvolvimento em Node.js e outras tecnologias web.
</ol>

***
## Dependências usando Npm
<ul>
    <li>express</li>
    <li>nodemon</li>
    <li>sequelize</li>
    <li>sequelize-cli</li>
    <li>pg</li>
    <li>dotenv</li>
    <li>pg-connection-string</li>
    <li>cors</li>
    <li>jsonwebtoken</li>
</ul>

## Diagrama de Entidade e Relacionamento 

![Imagem do Projeto](assets/Captura%20de%20tela%20de%202023-07-20%2022-17-39.png)

<p>Tabela Usuarios:

Representa os dados dos usuários no sistema.
Possui um relacionamento de um para muitos com o modelo Deposito, onde um usuário pode ter vários depósitos associados a ele.

<p>Tabela Depositos:

Representa os dados de depósitos onde os medicamentos são armazenados.
Possui um relacionamento de muitos para muitos com o modelo Usuario, permitindo que vários usuários estejam associados a um depósito.
Possui um relacionamento de muitos para muitos com o modelo Medicamentos, permitindo que vários medicamentos estejam associados a um depósito.

<p>Tabela Medicamentos:

Representa os dados de medicamentos no sistema.
Possui um relacionamento de muitos para muitos com o modelo Deposito, permitindo que um medicamento esteja associado a vários depósitos.

<p>Tabela MedicamentosDepositos:

Representa o relacionamento entre os modelos Medicamentos e Deposito.
Facilita os relacionamentos muitos para muitos entre medicamentos e depósitos, permitindo a associação de medicamentos com locais específicos de depósito.

<p>É um sistema de gerenciamento farmacêutico que permite aos usuários administrar depósitos, medicamentos armazenados nesses depósitos e contas de usuário. Ele permite que os usuários associem medicamentos a depósitos específicos e recuperem dados com base em vários critérios. O projeto foi projetado para lidar com operações CRUD (Criar, Ler, Atualizar, Excluir) para essas entidades e gerenciar os relacionamentos entre elas usando as associações do Sequelize.

## Para rodar o projeto 

<p>
  Clonar o repositório da aplicação com o comando a seguir:
</p>

```sh
  git clone https://github.com/AdrianoVolter/Pharmacy_Central_System_-PCS-.git
```
***

<p>
  Intalaçao das dependências, comando a seguir:
</p>

```sh
npm install
```
***

### Para instalar as dependêcias necessarias, use o comando :

```
npm install <nome_da_dependeicia>
```

### Para para iniciar o servidor, use o comando :

```
npm start
```
### Para criar as tabelas no banco de dados, use o comando :

```
npx sequelize-cli db:migrate
```


## Melhorias futuras para api 

Para melhorar a api , pretendo adicionar mais funcionalidades , como por exemplo :
<li>Adicionar mais tabelas no banco de dados , como por exemplo a tabela de laboratorios , que vai ser relacionada com a tabela de medicamentos.

<li>Adicionar mais rotas , como por exemplo a rota especificas para usuários e suas funcionalidades .

<li>Adicionar criptografia de senha , para que a senha do usuário não fique exposta no banco de dados.

<li>Adicionar mais validações , para que o usuário não possa cadastrar dados inválidos no banco de dados.

### Adriano Jose Volter

#### Link do trello [Click aqui !](https://trello.com/b/UaxE96it/pharmacy-central-system-pcs-modulo-2-projeto-avaliativo)

#### Link do repositório [Click aqui !](https://github.com/AdrianoVolter/Pharmacy_Central_System_-PCS-)

#### Meu perfil do GitHub  [ Click aqui !](https://github.com/AdrianoVolter)
***