## Gutenberg block wordpress theme



## What's included?
* Gutenberg blocks configuration tested in WordPress v5.1
* NPM configuration
* ESNext*
* Support for Editor color palettes
* More coming


## Setup
* Prerequisites: [Node.js](https://nodejs.org) (NPM) needs to be installed on your system
* Add the following code snippet to `functions.php` in your theme
```
$theme_blocks = __DIR__ . '/blocks/index.php';
if ( is_readable( $theme_blocks ) ) :
	require_once $theme_blocks;
endif;
```
* Open `/blocks` in Terminal and install the required Node.js dependencies
* `$ npm install`
* You can easily include additional blocks by duplicating `/src/block#` and referencing the new block(s) in `/src/index.js`
