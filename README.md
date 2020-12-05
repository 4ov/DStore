# DStore
## Yet another JSON storage for Deno

### Usage

```javascript
import {DStore} from 'https://deno.land/x/DStore/mod.ts'

const store = new DStore('./test.json')

store
.set('name', 'Me')
//i', using lodash's get method so ...
.set('kids[0]', 'Him')
.push('kids', 'Her')
//i have .save method like lowdb so ...
.save()
```