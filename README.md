# env

For the moment you must have a .env file or folder which should contains those parameter :

- DB_USER = 'your_username'
- DB_PWD = 'your_secret_password'
- DB_NAME = 'the_database_name'
- CLUSTER_NAME = 'the_cluster_name'
- PORT = the_port_you_re_working_on

Noticed that every default parameter in this app are FAKE, they do not provide access to any database nor data.

# API ENDPOINT -- Need update

## API Items

|METHOD|ENDPOINT|PARAMETER|PURPOSE|
|--|:--|:--|:--|
|GET|[/items/all](#get-all-items)|None|Get all items|
|PUT|[/items/:id](#put-item)|The item id|Modify a specific item|
|DELETE|[/items/:id](#delete-item)|The item id|Delete a item|

## API Stuff

|METHOD|ENDPOINT|PARAMETER|PURPOSE|
|--|:--|:--|:--|
|GET|[/stuff](#get-all-stuffs)|None|Get all stuffs|
|GET|[/stuff/:id](#get-one-stuff)|The stuff id|Get a stuff by is id|
|POST|[/stuff](#post-stuff)|None|Post a new stuff|

## API Material

|METHOD|ENDPOINT|PARAMETER|PURPOSE|
|--|:--|:--|:--|
|GET|[/material](#get-all-materials)|None|Get all materials|
|GET|[/material/:id](#get-one-material)|The material id|Get a material by is id|
|POST|[/material](#post-material)|None|Post a new material|

## API Characters

|METHOD|ENDPOINT|PARAMETER|PURPOSE|
|--|:--|:--|:--|
|GET|[/character](#get-all-characters)|None|Get all characters|

## API PNJ

|METHOD|ENDPOINT|PARAMETER|PURPOSE|
|--|:--|:--|:--|
|GET|[/pnj](#get-all-pnjs)|None|Get all pnjs|

## API Mobs
|METHOD|ENDPOINT|PARAMETER|PURPOSE|
|--|:--|:--|:--|
|GET|[/mob](#get-all-mobs)|None|Get all mobs|