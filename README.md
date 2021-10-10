# Mobiquity code challenge
This repository includes the code challenge result for Mobiquity.

It's an application of dynamic programming, specifically The Knapsack Problem.

The following technologies are used to solve this problem:
* TypeScript as the language.
* Mocha as the testing framework.
* Yarn as the package manager.

To run the tests, clone the repository, and run the following commands:
```bash
$ git clone https://github.com/AbdelrahmanHafez/mobiquity-code-challenge.git
$ cd mobiquity-code-challenge
$ yarn
$ yarn test
```

In order to test with custom text files, add any file you'd like in the directory called [text-files](./text-files), and run the [pack function](./src/pack.ts) with the file name as a parameter.

e.g. (for testing with a file called "test-file.txt" that we added in [text-files](./text-files) directory)
```ts
export async function pack(fileName: string) {
  // ...
}

pack('test-file.txt')
  .then((result)=> console.log(result))
  .catch(console.error);
```