# theMessenger
Messenger service that uses postMessage to send messages cross-origin

## Install

```
$ npm install themessenger
```

## Include

```
var TheMessenger = require( 'themessenger' );
```

## Usage

```javascript
// create an instance of the Messenger service
// you need to pass the source (window in this case), and a callback function
let Messenger = new TheMessenger( window, receiveMessage.bind( this ) );

// function that will be called when a message is received
function receiveMessage ( data ) {
	console.log( 'received message', data );
}

//sending a message
let data = { success: true };
let frame = window.frames.preview;

Messenger.send( frame, data );
```

## Options

* origin - this is so you can restrict to only listen to messages from a specific URI
* targetOrigin - this is so you can specify the target's origin to whom you're sending the message so that hostname/port must match the one set.

both options default to '*', which means any origin/targetOrigin is able to receive the message.

see https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage for more details