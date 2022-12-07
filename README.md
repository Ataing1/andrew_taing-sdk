# Andrew-Taing-SDK

SDK for LibLab take home project

## Requirements

To use this SDK, you will need:

-   [Node.js **v8.0.0 or above**](https://nodejs.org/)

Node installation will include [NPM](https://www.npmjs.com/), which is
responsible for dependency management.

## Installation

### Node.js

`npm install andrew-taing-sdk`

`const AndrewTaingSdk = require("andrew-taing-sdk");`

## Usage

This SDK relies heavily on [Promises](https://developers.google.com/web/fundamentals/getting-started/primers/promises),
making it easier to handle the asynchronous requests made to the API. The SDK
provides a `AndrewTaingSdk` object containing several methods which map to the
calls and parameters described in [The One Api's API documentation](https://the-one-api.dev/documentation)

The following snippets are examples of how to use the SDK.

Aside from requests to the book API, before executing any request, you need to authorize the calls to the API:

#### Using an access token

```js
const andrewSDK = new AndrewTaingSdk({
    accessToken: "<Your Access Token Here>",
});
```

#### Making requests

You can now use the various methods from the SDK to fetch different information on the lord of the rings. Following the Promises notation, you should use
`.then()`/`.catch()` to handle the successful and failed requests,
respectively. You can also use async await wrapped in a try catch block

Most of the calls take an object as the only parameter.
A list of available methods is below with links to exmaples on how to use them and more information on the values the object parameter will use.

## Available methods -> response

### Book

-   `getAllBooks(queryObject)` -> List of all "The Lord of the Rings" books
    -   mandatory queryObject attributes: N/A

```js
const result = await andrewSDK.getAllBooks({ limit: 2 });
```

-   `getOneBook(queryObject)` -> Request one specific book
    -   mandatory queryObject attributes: id (book id)

```js
const result = await andrewSDK.getOneBook({
    limit: 2,
    id: "5cf58077b53e011a64671583",
});
```

-   `getAllBookChapters(queryObject)` -> Request all chapters of one specific book
    -   mandatory queryObject attributes: id (book id)

```js
const result = await andrewSDK.getAllBookChapters({
    page: 1,
    limit: 20,
    id: "5cf58077b53e011a64671583",
});
```

### Movie

-   `getAllMovies(queryObject)` -> List of all movies, including the "The Lord of the Rings" and the "The Hobbit" trilogies
    -   mandatory queryObject attributes: N/A

```js
const result = await andrewSDK.getAllMovies();
```

-   `getOneMovie(queryObject)` -> Request one specific movie
    -   mandatory queryObject attributes: id (movie id)

```js
const result = await andrewSDK.getOneMovie({ id: "5cd95395de30eff6ebccde5d" });
```

### Character

-   `getAllCharacters(queryObject)` -> List of characters including metadata like name, gender, realm, race and more
    -   mandatory queryObject attributes: N/A

```js
const result = await andrewSDK.getAllCharacters({
    page: 1,
    limit: 3,
    filters: ["name=Gandalf"],
});
```

-   `getOneCharacter(queryObject)` -> Request one specific character
    -   mandatory queryObject attributes: id (character id)

```js
const result = await andrewSDK.getOneCharacter({
    id: "5cd99d4bde30eff6ebccfea0",
});
```

### Quote

-   `getAllQuotes(queryObject)` -> Request all quotes (use the queryObject to filter results)

    -   queryObject attribute options:
        -   `{from: "MOVIE", id: "<MOVIE_ID>"}` -> Request all movie quotes for one specific movie (only working for the LotR trilogy)
        -   `{from: "CHARACTER", id: "<MOVIE_ID>"}`-> Request all movie quotes of one specific character
        -   `{from: "ALL"}` || `{}` -> List of all movie quotes

```js
const result = await andrewSDK.getAllQuotes({
    page: 1,
    limit: 20,
    from: "MOVIE",
    id: "5cd95395de30eff6ebccde5d",
});

const result1 = await andrewSDK.getAllQuotes({});
```

-   `getOneQuote(queryObject)` -> Request one specific movie quote
    -   mandatory queryObject attributes: id (quote id)

```js
const result = await andrewSDK.getOneQuote({ id: "5cd96e05de30eff6ebcce84c" });
```

### Chapter

-   `getAllChapters(queryObject)` -> List of all book chapters

```js
const result = await andrewSDK.getAllChapters({ page: 2, limit: 3 });
```

-   `getOneChapter(queryObject)` -> Request one specific book chapter
    -   mandatory queryObject attributes: id (chapter id)

```js
const result = await andrewSDK.getOneChapter({
    id: "6091b6d6d58360f988133b90",
});
```

## general queryObject attributes

these attributes can be added to any method, but only the methods prefixed with getAll will use them

-   pagination

    -   `{limit: 20}` -> limits the number of results to 20
    -   `{page: 1}` -> requests the nth page
    -   `{offset: 1}` -> skips the first n results

-   sort

    -   `{sort: "asc"}` -> sorts the results in ascending order (use "desc" for descending order)

-   filters
    -   `{filters: ["name=Gandalf","name!=Frodo"]}` -> The filtering works by casting simple url parameter expressions to mongodb lookup expressions and can be applied to any available key on the data models. for more examples visit the api documentation https://the-one-api.dev/documentation. include just the query (everything after the ? in the examples)

### Build this SDK

To use this repository, here are the steps necessary to prepare your environment:

1. Clone the repository
2. In the root folder, run `npm install` to install all of the dependencies.
3. go to https://the-one-api.dev/ and get an access token to use for test purposes
4. Create a `secret.json` file with the following structure:

```json
{
    "accessToken": "<your access token>"
}
```

To Test this sdk, cd into the package folder and type npm test. This will run jest on the tests in the packages/__tests__ folder
