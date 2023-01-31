# Motivation

Creating the boilerplate of plugin or theme settings page using WordPress packages and make UI and UX close to WordPress and Gutenberg backend.

# What's inside

* 🤹🏻  Keep as simple as possible

* 👥  Close design and UX to WordPress and Gutenberg
	* 🥞  Components from **@wordpress/components**.

* 🪶  Lightweght assets
	* Using **wp-scripts** package with WebPack underhood to build bundle with minification on production mode
	* Loads embedded to WordPress React, @wordpress/components libraries and jQuery without including to final bundle
	* jQuery to perform ajax requests - we can use any package, but we already have it on backend.
	* Using @wordpress/i18n for i18n capatible translations.

* 🧑‍🎨  PostCSS with stage-0 features to use any CSS-next features

* ⚡  Great developer experience
	* 🚀 Supports React Hot Module Reload to refresh components without reloading the page.

* ☄️ Effector state manager - it's effective state manager without big boilerplate of code and clean

* Notifications

* Form Examples
	* Simple form - form with couple fields.

* 🔬  Coding standarts
	* Phpcs and wp-coding-standards is available
	* Prettier is used to format js, css files

* 🌏  Translation Ready
	* [x] 📝  Use @wordpress/i18n and __();
	* [ ] 📥  Generate pot and json files for translation

# How to try on my WordPress site? 🤔 

Clone the repo using next command to your `wp-content/plugins/` directory:

```
git clone https://github.com/fnpen/wp-modern-settings-page-boilerplate-internal.git
```

Enable plugin 'Modern Settings Page Boilerplate for WordPress' and click to 'Modern Settings' menu item.


# How to modify and build bundle? 😎 

Install nodejs and npm to your system,

Install all packages :

```
npm install

// if you use pnpm:

pnpm i
```

Use the next command to build the bundle in development mode:

```
npm run start
```

# 🥳 

Have a great time with developing!

> The bundle will be rebuilt on any file change.

Use the next command to build the bundle in production mode:

```
npm build
```

## Using Hot Module Reload mode 🤔 

Install mkcert on your system using the next manual: [https://github.com/FiloSottile/mkcert](https://github.com/FiloSottile/mkcert#installation)

Register this root certificate:

```
mkcert -install
```

Generate certificate for localhost:

```
mkcert localhost 127.0.0.1 ::1
```

The last command will create two files: "./localhost+2.pem" and "./localhost+2-key.pem"

Rename file `.env.example` to `.env` and paste the next content:

```
TSL_KEY='FULL_PATH_TO_FOLDER/.mkcert/localhost+2-key.pem'
TSL_CERT='FULL_PATH_TO_FOLDER/.mkcert/localhost+2.pem'
```

> Replace FULL_PATH_TO_FOLDER with path to folder with created certificated.

Run wp-script in "hot" mode and refresh page:

```
npm run hot
```

Now you can try edit js files and the dev server reflects changes to page.

