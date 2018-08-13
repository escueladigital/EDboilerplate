Puede integrar markdown con pug de cualquiera de las tres formas siguientes:

1. Usar el filtro dentro de pug

```
:markdown-it
  Esto es **markdown**
```

2. Combinando HTML y markdown dentro de pug

```
:markdown-it(html)
    ##Hola humano, este no es un **párrafo** es un h2    
    <p>Soy un elemento HTML dentro de Markdown </p>
```

3. Incluyendo archivos markdown externos

```
include:markdown-it(html) md/example.md
```