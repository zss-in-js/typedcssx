## ⚠️ NOTE: This project has been deprecated in favour of [Plumeria](https://github.com/zss-in-js/plumeria/tree/main). Please take a look at [the migration guide](https://github.com/zss-in-js/plumeria/blob/main/docs/typedcssx-migration-guide.md).

---

<div align="center">

[![Release Status](https://img.shields.io/github/release/typedcsslab/typedcssx.svg?color=64C8C8)](https://github.com/typedcsslab/typedcssx/releases/latest)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?color=64C8C8)](https://opensource.org/licenses/MIT)

</div>

## Installation

It works with any front-end framework and also works with a single ts file.

```sh
npm install --save-dev typedcssx
```

## Features

- Type first
- Type safe
- Can linter
- Ease API
- Scaleble
- Maintainable
- Zero-Runtime
- RSC-Support

## What is TypedCSSX ?

TypedCSSX allows you to write CSS as TypeScript, making your styles type safe and maintainable and integrated with your development environment. With features like static CSS generation. Theoretical perfect performance while keeping your CSS code clean and scalable.

## Documentation

For full documentation, visit [typedcssx site](https://typedcssx.vercel.app/).  
To the check out the version information, visit [release notes](https://github.com/typedcsslab/typedcssx/releases).

## Quick Start

```typescript
import cssx from 'typedcssx';

const css = cssx.create({
  blue: {
    fontSize: 18,
    color: 'blue',
  },
});

const Page = () => <div className={css.blue}>Hello World</div>;
```

## Community

For help, discuss best practices and please join the conversation here:  
[Discuss TypedCSSX on GitHub](https://github.com/typedcsslab/typedcssx/discussions)
