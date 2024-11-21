.editorconfig
root = true
[*]
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
charset = utf-8
indent_style = tab
indent_size = 4

npm i eslint-config-prettier eslint-plugin-prettier prettier

package.json
"eslintConfig": {
"extends": [
"react-app",
"react-app/jest",
"prettier"
],
"plugins": [
"prettier"
]
},

Области хранения данных:

-   база данных на json-server
-   BFF
-   Redux Store

Сущности приложения:

-   пользователь: БД(список пользователей), BFF(сессия текущего пользователя), Redux Store (отображение в браузере)
-   роль пользователя: БД(список ролей), BFF(сессия текущего пользователя), Redux Store (использовать в браузере)
-   статья: БД(список статей), Redux Store (отображение в браузере)
-   комметарий: БД(список комментариев), Redux Store (отображение в браузере)

Таблицы БД:

-   пользователи - users: id /login / password / registed_at / role_id
-   роли - roles: id / name
-   статьи - posts: id / title / image_url / content / published_at
-   комметарии - comments: id / author_id / post_id / content/published_at

Схема состояний на BFF:

-   сессия текущего пользователя: login / password / role

Схема для Redux Store

-   user: id / login / roleId / session
-   posts: массив post: id / title / imageUrl / publishedAt / commentsCount
-   post: id / title / imageUrl / content / publishedAt / comments: массив comment: id / author / content / publishedAt
-   users: массив user: id / login / registedAt / role
