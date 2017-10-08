![Essence](http://www.felix-girault.fr/wp-content/uploads/2015/10/essence31.png)

Extracts informations about web pages, like youtube videos, twitter statuses or blog articles.

[![Build Status](https://travis-ci.org/essence/essence.js.svg?branch=master)](https://travis-ci.org/essence/essence.js)

## Installation

```sh
npm install essence
```

## Usage

```js
import extract from 'essence';

const response = await extract('http://example.com');

console.log(response.toJson());
```
