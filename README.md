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
greet({ name = 'User' })   // Log "Hello {name}" to the console
````

### Collection

Manage collections easily.

````js
// Options
localStorageKey = null        // Local Storage key to make the collection persistent
primaryKey = '$id'            // Primary key which is used by all documents of the collection

// State
documents                     // Reactive array with all documents of the collection

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
