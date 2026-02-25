# FocoTotal-Extention

`FocoTotal-Extention` é uma extensão para o Google Chrome que melhora a sua experiência ao assistir vídeos, adicionando um "modo cinema" que escurece o restante da página e um modo de tela cheia customizado para focar totalmente no conteúdo do vídeo.

## Demonstração

<p align="center">
  <img src="./screen/screen.gif" alt="Demonstração do FocoTotal em uso" width="700"/>
</p>

## Como Instalar (Uso Geral)

A maneira mais fácil de usar a extensão é baixando a versão mais recente diretamente da nossa página de Releases.

1.  Acesse a **página de Releases do FocoTotal-Extention**.
2.  Encontre a versão mais recente (geralmente no topo, marcada como "Latest").
3.  Em **Assets**, clique no arquivo `.zip` (ex: `FocoTotal-Extention-vX.X.X.zip`) para baixar.
4.  Descompacte o arquivo `.zip` em uma pasta permanente no seu computador.
5.  Abra o Google Chrome e navegue até `chrome://extensions`.
6.  Ative o **"Modo do desenvolvedor"** no canto superior direito da página.
7.  Clique no botão **"Carregar sem compactação"**.
8.  Selecione a pasta que você descompactou no passo 4.
9.  Pronto! A extensão **FocoTotal** estará instalada e pronta para uso.

## Tecnologias Utilizadas

| Tecnologia             | Descrição                                                                                                   |
| :--------------------- | :---------------------------------------------------------------------------------------------------------- |
| **Manifest V3**        | A especificação mais recente para extensões do Chrome, garantindo segurança e performance.                  |
| **React & TypeScript** | Utilizados para construir a interface do usuário (UI) e a lógica dos componentes de forma robusta e tipada. |
| **Vite**               | Ferramenta de build moderna que oferece um ambiente de desenvolvimento extremamente rápido com HMR.         |
| **Tailwind CSS**       | Framework CSS utility-first para uma estilização rápida e consistente.                                      |
| **Shadcn/UI**          | Coleção de componentes de UI reutilizáveis para agilizar o desenvolvimento da interface.                    |

## Padrões de Projeto

- **Injeção de Conteúdo (Content Scripts)**: O núcleo da funcionalidade reside em `content.js` e `content.css`. Esses arquivos são injetados diretamente nas páginas web para identificar players de vídeo, adicionar o botão "Tela Cheia" e aplicar os estilos necessários.
- **Manipulação de DOM com React Portals**: O componente `ModalVideo.tsx` utiliza `createPortal` para renderizar a UI do modal diretamente no `<body>` da página, evitando conflitos de `z-index` e estilo. A lógica principal move o container do vídeo do seu local original para dentro do modal e o devolve quando fechado, criando um "modo cinema" sem recarregar o player.
- **Placeholder Dinâmico**: Para evitar que a página "pule" quando o vídeo é movido para o modal, um `div` com as dimensões exatas do vídeo é deixado em seu lugar, garantindo uma transição suave.

## Ambiente de Desenvolvimento (Para Contribuidores)

Siga os passos abaixo para configurar o ambiente de desenvolvimento.

### Pré-requisitos

- **Node.js** (versão 20 ou superior).
- **NPM** ou **Yarn** (ou outro gerenciador de pacotes).

### 1. Instalação

Clone o repositório e instale as dependências do projeto:

```bash
git clone https://github.com/Jeffersoncharlles/FocoTotal-Extention.git
cd FocoTotal-Extention
npm install
```

### 2. Desenvolvimento

Para compilar o projeto em modo de desenvolvimento e observar as alterações em tempo real, execute:

```bash
# Este comando irá gerar a pasta /dist e mantê-la atualizada
npm run dev
```

### 3. Build para Produção

Para gerar a versão final e otimizada da extensão na pasta `/dist`, execute:

```bash
npm run build
```

### 4. Carregando a Extensão no Chrome

1. Após executar `npm run build` (ou `npm run dev`), a pasta `/dist` será criada.
2. Abra o Google Chrome e navegue para `chrome://extensions`.
3. Ative o **"Modo do desenvolvedor"** no canto superior direito.
4. Clique em **"Carregar sem compactação"**.
5. Selecione a pasta `dist` gerada no seu projeto.
6. A extensão **FocoTotal** aparecerá na sua lista e estará pronta para uso.

## Contribuição

Este é um projeto de código aberto e sua contribuição é muito bem-vinda! Se você tem uma ideia para uma nova funcionalidade, encontrou um bug ou quer dar suporte a um novo site, sinta-se à vontade para:

- Abrir uma **Issue** para discutir sua ideia ou relatar um problema.
- Enviar um **Pull Request** com suas melhorias.

## Colaboradores

- Jefferson Charlles

---

_<NOME DO PROJETO>: FocoTotal-Extention_
