# wercker-docs

[![wercker status][wercker-image]][wercker-url]
[![semistandard-style][semistandard-image]][semistandard-url]

Wercker docs built with [gulp][gulp] and [metalsmith][metalsmith].

## Install
```no-highlight
hub clone wercker/docs
```

Make sure to have [`npm>=2.0.0`][npm] installed to build local modules.

## Running with wercker dev

```
wercker dev --publish 1337
```

## Usage
```txt
Lifecycle scripts included in dev:
  postinstall
    echo 'linklocal' && linklocal link -r && linklocal list -r | bulk -c 'npm install'
  start
    npm run build && npm run open
  test
    semistandard

available via `npm run-script`:
  build
    gulp build
  clean
    rm -rf {cache,release,coverage}
  content
    gulp content
  open
    open http://localhost:1337 && httpster -d build -p 1337
  watch
    watchify index.js -t brfs -o build/bundle.js
  format
    semistandard-format -w
```


## Style Guide
   * Wercker must always be uppercase.
   * Prefer American English
   * All nouns which are normally two words in English should be written as two
       words. e.g.
       * Run time and not runtime
           * http://www.oed.com/view/Entry/168872?redirectedFrom=run-time#eid24818252
       * Query string
       * Start up
   * Except terms of art, e.g.
       * Username
           * http://english.stackexchange.com/a/43440
   * Capitalize proper nouns like Elasticsearch

## License
[MIT](https://tldrlegal.com/license/mit-license)

[gulp]: http://gulpjs.com
[metalsmith]: http://www.metalsmith.io/
[npm]: http://npmjs.com

[wercker-image]: https://app.wercker.com/status/05eb642a41844e42b392d2db39bb7552/s "wercker status"
[wercker-url]: https://img.shields.io/wercker/ci/wercker/docs.svg
[semistandard-image]: https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square
[semistandard-url]: https://github.com/Flet/semistandard
