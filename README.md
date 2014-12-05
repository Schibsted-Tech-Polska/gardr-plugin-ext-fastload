# Gardr Fastload Plugin (Ext)

Gardr plugin that overrides default "render" event triggering from window.onload to DOMContentLoaded for flash and nested iframe ads.
Runs automatically.

## Install

```
npm install gardr-plugin-ext-fastload --save
```

## Bundle

In your ext bundle file:
```javascript
    var gardrExt = require('gardr-ext');
    var fastload = require('gardr-plugin-ext-fastload');

    gardrExt.plugin(fastload);

    module.exports = gardrExt;
```
