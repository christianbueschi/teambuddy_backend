Hipsum.js
================

A filler text helper for Handlebars templates.

[![Build Status](https://travis-ci.org/MarcDiethelm/Hipsum.js.png?branch=master)](https://travis-ci.org/MarcDiethelm/Hipsum.js) master<br>
[![Build Status](https://travis-ci.org/MarcDiethelm/Hipsum.js.png?branch=develop)](https://travis-ci.org/MarcDiethelm/Hipsum.js) develop

## Installation

Install Hipsum.js in your project folder using a terminal.

```Bash
npm install hipsum --save
```

In your application you can then include and register the helper.

```js
var handlebars = require('handlebars'),
    require('hipsum')(handlebars);
```

## Usage

In your Handlebars templates you can now use the helper called `filler`.

```Handlebars
{{filler}} // produces one paragraph of Lorem ipsum.
{{filler 47}} // produces 47 words of Lorem ipsum.
```

### Alternate Texts

If you prefer some good ol' English why not use some Shakespeare as your filler text?

```Handlebars
{{filler 10 "hamlet"}} // produces 10 words of "To be or not to be".
```

## Advanced Setup

Alternatively you can pass the helper around and not let Hipsum.js register it. This is useful e.g. if you use
[express3-handlebars](https://github.com/ericf/express3-handlebars) or when you want to specify the name of the helper
yourself. 

```js
var handlebars = require('handlebars'),
    hipsumHelper = require('hipsum')();

handlebars.registerHelper('filler', hipsumHelper);
```

## Roadmap

- Random text generation
- Richtext
	- Paragraphs
	- Links
	- Headings, Lists, Tables, Blockquotes
	- Images(?)
	- Code(?)