# env

For the moment you must have a .env file or folder which should contains those parameter :

- DB_USER = 'your_username'
- DB_PWD = 'your_secret_password'
- DB_NAME = 'the_database_name'
- CLUSTER_NAME = 'the_cluster_name'
- PORT = the_port_you_re_working_on

Noticed that every default parameter in this app are FAKE, they do not provide access to any database nor data.

# API ENDPOINT

|METHOD|ENDPOINT|PARAMETER|PURPOSE|
|--|:--|:--|:--|
|GET|[/items/all](#get-items)|None|Data of all items|
|POST|[/items/stuff](#post-stuff)|None|Post a new stuff|
|POST|[/items/material](#post-material)|None|Post a new material|
|PUT|[/items/stuff/:id](#put-stuff)|The stuff id|Modify a specific stuff|
|PUT|[/items/material/:id](#put-material)|The material id|Modify a specific material|
|DELETE|[/items/:id/](#delete-item)|The item id|Delete a specific item|


## Items

### GET

`API_URL/items/all`

### 