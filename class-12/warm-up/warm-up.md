# Warm-Up Exercise
Read through this code as if you are the interpreter. Find all of the mistakes in this code and write down the correct syntax for each mistake.

## view/index.ejs

```
<!DOCTYPE html />
<html>
  <head>
    <title>Code Challenge!</title>
  </head>
  <body>
    <ul>
      <% data.forEach(user => { %>
        <li>
          <h2><%= user.username %></h2>
        </li>
      <% }) %>
    </ul>
   </body>
</html>
```
