### Table displaying data with complete data
https://github.com/lordkiz/FlixTable/assets/18648835/3d3ea710-5112-4dca-9f3e-e6d4d5d73012



### Table displaying data with incomplete and inconsistent data
https://github.com/lordkiz/FlixTable/assets/18648835/d01300fd-433c-4aa7-8a2e-b32a766481f0


## Features

- Resilient Table, can display most data types
- Maintains ordering of columns
- Inbuilt handling of cases of missing data and inconsistent keys
- Sortable columns

# Notes
### On User Data
I have taken a peculiar approach in ensuring the Table can handle inconsistent and incomplete data and also to maintain consistent ordering of the columns.

To achieve consistent ordering of the columns, it was important to use data structures that maintains ordering. So in this case arrays(nested/tuple-like) was the approach I settled on. I avoided using objects(dictionaries) as this does not maintain ordering and dynamically generating keys using `Object.keys(object-like-data)` is not guaranteed to produce consistent ordered results everytime. You will find that processedData looks like this:
```js
[
  [["name", "age"],["Michael", 24]],
  [["name", "age"],["Julian", 42]]
]
```
where `ProcessedData[0][0]` is an array of column names and `ProcessedData[0][1]` are corresponding values.

We cannot always trust that data is complete. In the real world, one can expect that some data might be missing, or some entries not present entirely. 
Handling missing data and inconsistent data entails prepopulating those values with a nullish value. 
It was also important that every key in every object in data is accounted for. In cases where, each object in data have a different or missing entry, an entire column can be missed and data will move to the left. The processing of data handles all of these cases.

### On caching
The requirements were adhered to - with expiration policy as required. A predetermined key was used as a

SIDE NOTE: However, in a real world application, a consistent hash of `Request` can be a another approach for determining the cache keys. Using a hashing approach ensures that we do not return the same data to our users when anything in a request changes - eg such as a new entry in the Headers.

### On Tests
I included tests for all non-UI modules. You can find tests related to each files in the `__tests__` folder within the same directory as the file in consideration.

# Running the App

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

### Install node modules

```
yarn
```

## iOS steps

1. Pod install

```
cd ios
pod install
```

## Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For iOS

```
npx react-native run-ios
```

### For Android

```
npx react-native run-android
```

### Testing

```
yarn test
```
