### Why functional programming
Compare to  OOP, FP is
1. Easier to test because of pure function

```js
// Pure
const add = (a, b) => a + b

// Not pure
let a = 0
const notPureAdd = (b) => a + b
```

2. Easier to write bug free code due to side effect elimination
3. Easier to debug since there is no "global" variable.
4. Immutability
5. curry
```js
const getUserName = fn => user => fn(user.name)

const upper = v => v.upperCase()
const lower = v => v.lowerCase()

const getUserWithUpper = getUserName(upper) 
const getUserWithLower = getUsername(lower)

const user = { name: 'jAne' }
getUserWithUpper(user) //JANE
getUserWithLower(user) // jane
```
6. FP embraces composition over inheritance

```js
 // Inheritance, how do we create a person that can both sing and fight without duplicate the code?
class Singer {
  constructor(name){
    this.name = name
  }

  sing() {
    return `${this.name} can sing.`
  }
}

class Fighter {
  constructor(name){
    this.name = name
  }

  fight() {
    return `${this.name} can fight.`
  }
}

// Composition
const canSing = (person) => Object.assign({}, person, {
  sing: () => {
    return `${person.name} can sing`
  }
})

const canFight = (person) => Object.assign({}, person, {
  fight: () => {
    return `${person.name} can fight`
  }
})

const jane = canFight(canSing({ name: 'Jane'}))

console.log(jane.fight()) // "Jane can fight"
console.log(jane.sing()) // "Jane can sing"
```


```js
// Ramda way
const sing = R.pipe(R.prop('name'), R.concat(R.__, ' can sing.'))
const fight = R.pipe(R.prop('name'), R.concat(R.__, ' can fight.'))
const jane = { name: 'Jane' }
console.log(sing(jane))
console.log(fight(jane))
```

