# Usage

This project supports [Node v6+](https://nodejs.org) and npm 2+ installed in your development toolchain.

Install and save in your package.json:

    npm install @pearson-components/modal --save

Additionally, since this component is published to NPM it is available via unpkg.com using a simple script include.

```html
<script type="text/javascript" src="https://unpkg.com/@pearson-components/modal@1.1.1/build/dist.modal.js"></script>
```

## External Dependencies

React and ReactDOM (v0.14 or v15) are external dependencies required to use this component. They are npm-installable or
available from a third-party [CDN](https://cdnjs.com/libraries/react/).

This component targets the styling in the [Pearson Elements SDK](https://www.npmjs.com/package/pearson-elements).

## Cross-browser Compatibility

The following [Polyfill.io](https://cdn.polyfill.io/v2/docs/examples) service is recommended for consuming this
component cross-browser:

```html
<script src="https://cdn.polyfill.io/v2/polyfill.js?features=CustomEvent,Intl.~locale.en,Intl.~locale.fr"></script>
```

The CustomEvent polyfill is for Internet Explorer, and the Intl.js polyfill is for Safari. As you support more languages,
add them to the list of features requested.

If your browser already supports a feature, this service automatically optimizes and does not bring down unnecessary code.

## How to Consume in an Application

See the /demo directory for example usage.

The transpiled, minified bundle will be available in /node_modules/@pearson-components in the component
/build directory after you have npm installed this component in your project.

Eventing example:

```js
[EVENTING EXAMPLE GOES HERE]
```

Direct API example:

```js
[DIRECT API EXAMPLE GOES HERE]
```

### Component Configuration

    [CONFIG INFO GOES HERE]

### Eventing

<table>
    <tr>
        <th>Event</th><th>detail</th>
    </tr
    <tr>
        <td></td><td></td>
    </tr>
</table>
