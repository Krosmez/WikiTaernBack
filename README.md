# Informations

`master` branch is for production only **WE DON'T DEV ANYTHING ON THIS BRANCH** <br/>
`dev` branch is like a preprod branch. **WE DON'T DEV PERSONNAL FEATURES ON THIS BRANCH** <br/>
`models` branch is for models or schema in Mongo <br/>
`routes` branch is for working on differents routes <br/>
`auth` branch is for authentification <br/>

# Start

To start application run <br/>
`node server.js`

# env

For the moment you must have a .env file or folder which should contains those parameter :

- DB_USER = 'your_username'
- DB_PWD = 'your_secret_password'
- DB_NAME = 'the_database_name'
- CLUSTER_NAME = 'the_cluster_name'
- PORT = the_port_you_re_working_on

Noticed that every default parameter in this app are FAKE, they do not provide access to any database nor data.