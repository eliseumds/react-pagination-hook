<h1 align="center">Welcome to react-pagination-hook 👋</h1>
<p>
  <img src="https://img.shields.io/badge/version-0.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/eliseumds/react-pagination-hook#readme">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" target="_blank" />
  </a>
  <a href="https://github.com/eliseumds/react-pagination-hook/graphs/commit-activity">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" target="_blank" />
  </a>
  <a href="https://github.com/eliseumds/react-pagination-hook/blob/master/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" target="_blank" />
  </a>
</p>

> A React hook that helps you render a paginator (with TypeScript support)

### 🏠 [See a demo](https://eliseumds.github.com/react-pagination-hook)

## Prerequisites

- react &gt;=16.8.0

## Install

```sh
npm install react-pagination-hook --save
```

## API

The hook returns the following object:

```ts
{
  activePage: number;
  isFirst: boolean;
  isLast: boolean;
  hasPrevious: boolean;
  hasNext: boolean;
  visiblePieces: PaginatorPiece[];
  goToPage: (pageNumber: number) => void;
}
```

And a *PaginatorPiece* is either of the following objects:

```ts
{ type: 'previous', pageNumber: number, isDisabled: boolean }
// or
{ type: 'next', pageNumber: number, isDisabled: boolean }
// or
{ type: 'page-number', pageNumber: number }
// or
{ type: 'ellipsis' }
```

## Usage

You can use this hook to develop your own pagination component. [Check out the demo](https://eliseumds.github.com/react-pagination-hook)

## Author

👤 **Eliseu dos Santos &lt;eliseumds@gmail.com&gt;**

* Twitter: [@eliseumds](https://twitter.com/eliseumds)
* Github: [@eliseumds](https://github.com/eliseumds)

## 🤝 Contributing

Contributions, issues and feature requests are welcome !<br />Feel free to check [issues page](https://github.com/eliseumds/react-pagination-hook/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2019 [Eliseu dos Santos &lt;eliseumds@gmail.com&gt;](https://github.com/eliseumds).<br />
This project is [MIT](https://github.com/eliseumds/react-pagination-hook/blob/master/LICENSE) licensed.

***

_This project was bootstraped with [typescript-library-starter](https://github.com/alexjoverm/typescript-library-starter)_

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
