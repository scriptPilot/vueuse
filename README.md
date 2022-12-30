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
- Each composable can return methods and reactive state objects
- Each method can accept an object with options as well

Objects are used to make the composables and functions parameters more explicit, flexible and to allow backward-compatibility if new parameters are added in the future.

## Composables

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
localStorageKey   // Local Storage key to make the state persistent
defaultValue      // Default value, for objects, it will be merged with the local storage

// Methods
reset()           // Reset value to the default value

// State
state             // Read/Writable reactive state
````

### Collection

Manage collections easily.

````js
// Options
localStorageKey               // Local Storage key to make the collection persistent, optional
primaryKey                    // Primary key used by all documents, default is $key

// Methods
addDoc({ doc })               // Add new document, key is created as UUID v4 if not provided
updateDoc({ key, updates })   // Apply the updates to the documemt with the given key 
removeDoc({ key })            // Remove the document with the given key
setDocs({ docs })             // Replace all documents, create keys if not provided

// State
documents                     // Read-only reactive array with all documents of the collection
````

### MySQLAPI

MySQL API Wrapper for the [PHP CRUD API](https://github.com/mevdschee/php-crud-api).

````js
// Options
apiUrl                               // API endpoint, /api.php file by default 

// Methods
isAvailable()                        // Returns true if API is available or false if not
apiRequest({ path, method, data })   // Returns promise, resolves with JSON response
createDoc({ table, doc })            // Returns promise, resolves with record key
updateDoc({ table, key, updates })   // Returns promise, resolves with record key
deleteDoc({ table, key })            // Returns promise, resolves with record key
getDoc({ table, key })               // Returns promise, resolves with record
getCollection({ path })              // Returns promise, reoslves with record array
````

### MySQLCollection

Collection with automatic synchronization with a MySQL table based on the [PHP CRUD API](https://github.com/mevdschee/php-crud-api).

````js
// Options
localStorageKey               // Local Storage key to make the collection persistent, optional
primaryKey                    // Primary key used by all documents, default is $key
apiUrl                        // API endpoint, /api.php file by default 
syncTable                     // Table name for the PHP CRUD API
syncFilter                    // Filter options for the PHP CRUD API, optional
syncInterval                  // Sync interval in milliseconds, 1.000 by default
syncStatus                    // Sync status, true by default

// Methods
addDoc({ doc })               // Add new document, key is created as UUID v4 if not provided
updateDoc({ key, updates })   // Apply the updates to the documemt with the given key 
removeDoc({ key })            // Remove the document with the given key
setDocs({ docs })             // Replace all documents, create keys if not provided
runSync()                     // Run sync manually
startSync()                   // Start automatic synchronization
stopSync()                    // Stop automatic synchronization

// State
documents                     // Read-only reactive array with all documents of the collection
````

Requires a MySQL table with some additional fields.

````sql
`$key` varchar(36) NOT NULL,
`$updated` bigint(14) NOT NULL, 
`$synchronized` bigint(14) NOT NULL, 
`$deleted` tinyint(1) NOT NULL DEFAULT 0,
````

### Google Auth

Sign-in users via Google and use the access token for API requests.

````js
// Options
clientId       // Google OAuth Client ID
clientSecret   // Google OAuth Client Secret
redirectUrl    // Redirection URL, optional, website origin by default
scope          // Scope as string or array

// Methods
signIn()       // Sign-in user to Google via redirect
signOut()      // Sign-out user from Google

// State
token          // Readonly, reactive access token, automatically refreshed
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
