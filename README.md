# Pharmacy Central System (PCS) 
## Gerenciamento de depósitos e medicamentos 
### Projeto avaliativo | modulo 2 back-end 
 
 
<p>
  Esse projeto tem como objetivo criar o backend do sistema Pharmacy Central System, a API Pharmacy Central System (PCS), para gerenciar usuários, depósitos e medicamentos , recebendo dados de requisição e inserindo-os no banco de dados postgres com nome de pcsbd e retornando dados necessários. 
  Nessa API podemos:
   <li>Cadastrar usuários, fazer login, alterar dados. 
   <li>Cadastrar depósitos, alterar dados , listar depósitos, deletar depósitos.
   <li>Cadastrar medicamentos em um ou mais depósitos, listar ,alterar e deletar.
</p>


## Tecnologias utilizadas

<p align="">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=nodejs,express,postgres,sequelize,javascript,git,github,vscode" />
  </a>
</p>

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

#### Tabela Usuarios:

Representa os dados dos usuários no sistema.
Possui um relacionamento de um para muitos com o modelo Deposito, onde um usuário pode ter vários depósitos associados a ele.

#### Tabela Depositos:

Representa os dados de depósitos onde os medicamentos são armazenados.
Possui um relacionamento de muitos para muitos com o modelo Usuario, permitindo que vários usuários estejam associados a um depósito.
Possui um relacionamento de muitos para muitos com o modelo Medicamentos, permitindo que vários medicamentos estejam associados a um depósito.

### Tabela Medicamentos:

Representa os dados de medicamentos no sistema.
Possui um relacionamento de muitos para muitos com o modelo Deposito, permitindo que um medicamento esteja associado a vários depósitos.

#### Tabela Medicamentos Depositos:

Representa o relacionamento entre os modelos Medicamentos e Deposito.
Facilita os relacionamentos muitos para muitos entre medicamentos e depósitos, permitindo a associação de medicamentos com locais específicos de depósito.

É um sistema de gerenciamento farmacêutico que permite aos usuários administrar depósitos, medicamentos armazenados nesses depósitos e contas de usuário. Ele permite que os usuários associem medicamentos a depósitos específicos e recuperem dados com base em vários critérios. O projeto foi projetado para lidar com operações CRUD (Criar, Ler, Atualizar, Excluir) para essas entidades e gerenciar os relacionamentos entre elas usando as associações do Sequelize.

## Para rodar o projeto 


#### Clonar o repositório da aplicação com o comando a seguir:


```sh
git clone https://github.com/AdrianoVolter/Pharmacy_Central_System_-PCS-.git
```
***


#### Intalaçao das dependências, comando a seguir:


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

### Aplicativos utilizados para desenvolver o projeto

<li>Visual Studio Code
  
  [![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-IDE-blue)](https://code.visualstudio.com/)

<li>Thunder Client

[![Thunder Client](https://img.shields.io/badge/Thunder%20Client-REST%20Client-orange)](https://www.thunderclient.io/)

<li>DBeaver

[![DBeaver](https://img.shields.io/badge/DBeaver-IDE%20para%20banco%20de%20dados-blue)](https://dbeaver.io/)

<li>Trello

[![Trello](https://img.shields.io/badge/Trello-Gerenciador%20de%20projetos-blue)](https://trello.com/)

### Feito Por Adriano Jose Volter

#### Link do trello [Click aqui !](https://trello.com/b/UaxE96it/pharmacy-central-system-pcs-modulo-2-projeto-avaliativo)

#### Link do repositório [Click aqui !](https://github.com/AdrianoVolter/Pharmacy_Central_System_-PCS-)

#### Meu perfil do GitHub  [ Click aqui !](https://github.com/AdrianoVolter)
***
### Professores responsáveis:

#### [Rawan.H](https://github.com/Hawangledt) 
#### [Pedro Henrique B. da Silva](https://github.com/pedrohbsilva) 

## FONTES DE PESQUISA
<li>https://chat.openai.com/
<li>https://www.phind.com/
<li>https://expressjs.com/pt-br/
<li>https://sequelize.org/
<li>https://www.npmjs.com/package
<li>https://jwt.io/
<li>https://www.postgresql.org/
<li>https://naereen.github.io/badges/

