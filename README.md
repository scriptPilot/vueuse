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
const composable = useComposable()
````

Every composable can accept an object with parameters and can return readonly states and methods, which can accept an object with parameters itself.

Objects are used to make the composables and functions parameters more explicit, flexible and allow backward-compatibility if new parameters are added in the future.

````js
// Use an option
const { state, method } = useComposable({ option: value })

// Use a state
console.log(state.value)

// Use a method
method({ option: 'value' })
````

## Composables

### HelloWorld

Methods

````js
greet({ name })     // Log "Hello {name}" to the console
````


````js
const {
  // Logs "Hello {name}" to the console
  greet({ name })
} = useHelloWorld()
````

### Collection

````js
const {
  documents,            // sdadasd
  addDoc({ doc }),      // sdajkljasd
  updateDoc({ doc })    // sadjklasjd
} = useCollection({
  localStorageKey       // asdjkalsdj
})

// Methods

// State

````

### Collection

````js
// Options
localStorageKey      // asdjkalsdj

// Methods
addDoc({ doc })      // sdajkljasd
updateDoc({ doc })   // sadjklasjd

// State
documents            // sdadasd
````

### Collection

Options

````js
localStorageKey      // asdjkalsdj
````

Methods

````js
addDoc({ doc })      // sdajkljasd
updateDoc({ doc })   // sadjklasjd
````

State

````js
documents            // sdadasd
````

````js
const {
  documents,
  addDoc({ doc }),
  updateDoc({ doc, updates }),
  removeDoc({ doc }),
  setDocs({ docs })
} = useCollection({
  localStorageKey
})
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
