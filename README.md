# px-calendar-picker [![Build Status](https://travis-ci.org/PredixDev/px-calendar-picker.svg?branch=master)](https://travis-ci.org/PredixDev/px-calendar-picker)
-----------------------------------------------

## Overview

`Px-calendar-picker` is a Predix UI component which renders a calendar for a given decade, year, or month, and allows users to select a date or range from the calendar. This component is used in `px-datetime-picker` and `px-datetime-range-panel`.
Note: `px-calendar-picker` is a calendar for selecting dates, NOT a display calendar.

## Usage

### Prerequisites
1. node.js
2. npm
3. bower
4. [webcomponents-lite.js polyfill](https://github.com/webcomponents/webcomponentsjs)

Node, npm and bower are necessary to install the component and dependencies. webcomponents.js adds support for web components and custom elements to your application.

## Getting Started

First, install the component via bower on the command line.

```
bower install px-calendar-picker --save
```

Second, import the component to your application with the following tag in your head.

```
<link rel="import" href="/bower_components/Px-Calendar-Picker/Px-Calendar-Picker.html"/>
```

Finally, use the component in your application:

```
<px-calendar-picker display-mode="day"></px-calendar-picker>
```

## Documentation

Read the full API and view the demo [here](https://predixdev.github.io/px-calendar-picker).

The documentation in this repository is supplemental to the official Predix documentation, which is continuously updated and maintained by the Predix documentation team. Go to [http://predix.io](http://predix.io)  to see the official Predix documentation.


## Local Development

From the component's directory...

```
$ npm install
$ bower install
$ gulp sass
```

From the component's directory, to start a local server run:

```
$ gulp serve
```

Navigate to the root of that server (e.g. http://localhost:8080/) in a browser to open the API documentation page, with link to the "Demo" / working examples.




### GE Coding Style Guide
[GE JS Developer's Guide](https://github.com/GeneralElectric/javascript)

<br />
<hr />

## Known Issues

Please use [Github Issues](https://github.com/PredixDev/px-calendar-picker/issues) to submit any bugs you might find.
