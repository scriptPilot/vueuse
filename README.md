# Vue Use

Collection of [Vue Composables](https://vuejs.org/guide/reusability/composables.html) in addition to [VueUse.org](https://vueuse.org/).

## Installation

````
npm i -D @scriptpilot/vueuse
````

## Usage

````js
// Import to the application store or to any component
import { useComposable } from '@scriptpilot/vueuse'

// Initalize the composable
const composable = useComposable({ ...options })

// Use a method
composable.method({ ...options })

// Use a state
console.log(composable.state.value)
````

- Each composable can accept an object with options.
- Each composable can return reactive state objects and methods
- Each method can accept an object with options as well

Objects are used to make the composables and functions parameters more explicit, flexible and allow backward-compatibility if new parameters are added in the future.

## Composables

### HelloWorld

Greet the world.

````js
// Methods
greet({ name = 'User' })   // Log "Hello {name}" to the console or "Hello User" by default
````

### Type

Identify the type of anything.

````js
// Methods
getType({ value })   // Returns the type of the given value as a string
````

### LocalStorage

Create a persistent reactive state for any value type.

````js
// Options
localStorageKey       // Local Storage key to make the state persistent
defaultValue = null   // Default value, for objects, it will be merged with the local storage

// State
state                 // Read/Writable reactive state

// Methods
reset                 // Reset value to the default value
````

### Collection

Manage collections easily.

````js
// Options
localStorageKey = null        // Local Storage key to make the collection persistent
primaryKey = '$key'           // Primary key which is used by all documents of the collection

// State
documents                     // Read-only reactive array with all documents of the collection

// Methods
addDoc({ doc })               // Add new document, key is created as UUID v4 if not provided
updateDoc({ key, updates })   // Apply the updates to the documemt with the given key 
removeDoc({ key })            // Remove the document with the given key
setDocs({ docs })             // Replace all documents, create keys if not provided
````

## Demo App

To test the composables locally and review code samples:

1. Install Docker and Node.js
2. Clone this repository and run `npm install`
4. Run `npm run dev` to start the Demo App

To use the Google-related composables:

1. Create a Google Cloud project 
2. Activate the Drive API and create an OAuth client
3. Modify and save the credentials.template.js file as credentials.js
