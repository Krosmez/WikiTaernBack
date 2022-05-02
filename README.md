# env

For the moment you must have a .env file or folder which should contains those parameter :

- DB_USER = 'your_username'
- DB_PWD = 'your_secret_password'
- DB_NAME = 'the_database_name'
- CLUSTER_NAME = 'the_cluster_name'
- PORT = the_port_you_re_working_on

Noticed that every default parameter in this app are FAKE, they do not provide access to any database nor data.

# API ENDPOINT -- Need update

|METHOD|ENDPOINT|PARAMETER|PURPOSE|
|--|:--|:--|:--|
|GET|[/items/all](#get-all-items)|None|Get all items|
|GET|[/stuff](#get-all-stuffs)|None|Get all stuffs|
|GET|[/material](#get-all-materials)|None|Get all materials|
|GET|[/character](#get-all-characters)|None|Get all characters|
|GET|[/pnj](#get-all-pnjs)|None|Get all pnjs|
|GET|[/mob](#get-all-mobs)|None|Get all mobs|
|GET|[/stuff/:id](#get-one-stuff)|The stuff id|Get a stuff by is id|
|GET|[/material/:id](#get-one-material)|The material id|Get a material by is id|
|POST|[/items/stuff](#post-stuff)|None|Post a new stuff|
|POST|[/items/material](#post-material)|None|Post a new material|
|PUT|[/items/stuff/:id](#put-stuff)|The stuff id|Modify a specific stuff|
|PUT|[/items/material/:id](#put-material)|The material id|Modify a specific material|
|DELETE|[/items/stuff/:id/](#delete-stuff)|The stuff id|Delete a stuff|
|DELETE|[/items/material/:id/](#delete-material)|The material id|Delete a material|


## Items

### GET

`API_URL/items/all`

### 