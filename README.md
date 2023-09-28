# GoldenRandom

[![npm version](https://badge.fury.io/js/goldenrandom.svg)](https://badge.fury.io/js/goldenrandom)

## Unique pseudo-random values using the Golden Ratio

GoldenRandom is a package that utilizes the golden ratio to generate unique random numbers.
You can save the progress, such as current state variables, in a database (for example) to prevent duplicates when restarting.
When creating an instance, you can specify the precision, which directly affects the uniqueness of the generated results.
By default, it uses a precision of `20` decimal places, making duplicates highly unlikely in practical applications.

## Installation

Install the package via npm:

```bash
npm install goldenrandom
```

## Usage

To use the GoldenRandom package in your Node.js application, follow these instructions:

### Quick start example

#### JS
```javascript
const GoldenRandom = require('goldenrandom');

const goldenRandom = new GoldenRandom();
const randomValue = goldenRandom.next();
console.log(`Random Value: ${randomValue}`);
```

#### TS
```typescript
import GoldenRandom from 'goldenrandom';

const goldenRandom = new GoldenRandom();
const randomValue: string = goldenRandom.next();
console.log(`Random Value: ${randomValue}`);
```

### Custom Configuration and Progress Saving example

#### JS
```javascript
const GoldenRandom = require('goldenrandom');
const { MongoClient } = require('mongodb');
// Configure your custom settings by providing a configuration object
const customConfig = {
    ADDEND_A: '0.618033988749895',
    ADDEND_B: '0.381966011250105',
    ACCURACY: 40, // Set your desired precision
    RETURN_TYPE: 'string', // Set the return type to 'string' or 'number' or 'BigNumber', default is 'string'
}; // Any of these values are optional
const goldenRandom = new GoldenRandom(customConfig);
// Generate a random numbers and save progress (if desired)
const randomValues = [];
for (let i = 0; i < 100000000000; ++i) {
    randomValues.push(goldenRandom.next());
}
console.log(randomValues.length === new Set(randomValues).size);
funcToPass(randomValues);

const progress = goldenRandom.getProgress();
// Save progress to a database
const client = new MongoClient('mongodb://localhost:27017');
client.connect().then(() => {
    const db = client.db('mydb');
    const collection = db.collection('progress');
    collection.insertOne({ progress });
    client.close();
});
```

#### TS
```typescript
import GoldenRandom, { GRConfig, GRProgress } from 'goldenrandom';
import { MongoClient } from 'mongodb';

// Configure your custom settings by providing a configuration object
const customConfig: GRConfig = {
    ADDEND_A: '0.618033988749895',
    ADDEND_B: '0.381966011250105',
    ACCURACY: 40, // Set your desired precision
    RETURN_TYPE: 'BigNumber', // Set the return type to 'string' or 'number' or 'BigNumber', default is 'string'
}; // Any of these values are optional
const goldenRandom = new GoldenRandom(customConfig);
// Generate a random numbers and save progress (if desired)
const randomValues: Array<BigNumber> = [];
for (let i = 0; i < 100000000000; ++i) {
    randomValues.push(goldenRandom.next());
}
console.log(randomValues.length === new Set(randomValues).size);
funcToPass(randomValues);

const progress: GRProgress = goldenRandom.getProgress();
// Save progress to a database
const client: MongoClient = new MongoClient('mongodb://localhost:27017');
client.connect().then(() => {
    const db = client.db('mydb');
    const collection = db.collection('progress');
    collection.insertOne({ progress });
    client.close();
});
```

## Theory

### The Golden Ratio Formula and Value Uniqueness

GoldenRandom utilizes the concept of the Golden Ratio to generate unique random numbers.
The Golden Ratio is a mathematical relationship that can be expressed as follows:

`φ = (1 + √5) / 2 = 1.618033988749895...`

In this formula, (√5) represents the square root of 5, and the result is divided by 2. This ratio, often denoted by the Greek letter φ (phi), has remarkable mathematical properties and is known for its aesthetic and geometric significance.

The uniqueness of values generated by GoldenRandom is achieved by leveraging the properties of the Golden Ratio. Here's how it works:

1. **Initialization**: When you create an instance of GoldenRandom, it sets up two initial values, `ADDEND_A` and `ADDEND_B`, and an accuracy level, `ACCURACY`. These values are crucial for generating random numbers.

2. **Next Value**: The `next()` method combines `ADDEND_A` and `ADDEND_B` and divides the result by the Golden Ratio. This process generates a new value, and then it updates `ADDEND_A` and `ADDEND_B` for the next iteration.

3. **Precision**: The `ACCURACY` parameter controls the precision of the generated values. By default, it is set to 20, which means the result is accurate to 20 decimal places. This high precision minimizes the chance of duplicate values in practical applications.

4. **Golden Ratio's Uniqueness**: The mathematical properties of the Golden Ratio ensure that the generated values are unique and not easily predictable. The iterative process, combined with the ratio's inherent irrationality, leads to a sequence of seemingly random and distinctive values.

By utilizing the Golden Ratio formula and customizing precision, GoldenRandom provides a reliable way to generate unique random numbers for various applications.

Remember that you can adjust the precision according to your specific requirements while still benefiting from the inherent uniqueness of the Golden Ratio. This makes GoldenRandom a powerful tool for tasks where uniqueness and unpredictability are essential.


## Interfaces

GoldenRandom provides the following interfaces:

#### GRConfig

```typescript
interface GRConfig {
    // Configuration values that are optional and can be overridden
    ADDEND_A?: string | number | BigNumber;
    ADDEND_B?: string | number | BigNumber;
    ACCURACY?: number;
    RETURN_TYPE?: 'string' | 'number' | 'BigNumber';
}
```

#### GRProgress

```typescript
interface GRProgress {
    // Progress values that can be saved and used to resume
    ADDEND_A: string | number | BigNumber;
    ADDEND_B: string | number | BigNumber;
    ACCURACY?: number;
}
```

## Methods

GoldenRandom provides the following methods:

#### constructor()

```typescript
constructor(config?: GRConfig);
```

#### next()

```typescript
next(): string | number | BigNumber;
```

#### getProgress()

```typescript
getProgress(): GRProgress;
```
