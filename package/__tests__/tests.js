const AndrewTaingSdk = require("../index");
const configs = require("../../secret.json");

const andrewSDK = new AndrewTaingSdk(configs);
describe("book api tests", () => {
    test("gets 3 books from getAllBooks()", async () => {
        const result = await andrewSDK.getAllBooks({ limit: 3 });
        expect(result.docs).toHaveLength(3);
    });

    test("get one book from getOneBook()", async () => {
        const result = await andrewSDK.getOneBook({
            limit: 2,
            id: "5cf58077b53e011a64671583",
        });
        expect(result.docs).toHaveLength(1);
    });

    test("get error from getOneBook() by not putting an id", async () => {
        try {
            const result = await andrewSDK.getOneBook({
                limit: 2,
            });
        } catch (e) {
            expect(e.message).toEqual(
                "The book id is not valid or it was not specified properly"
            );
        }
    });

    test("get 20 chapters from one book with getAllBookChapters()", async () => {
        const result = await andrewSDK.getAllBookChapters({
            page: 1,
            limit: 20,
            id: "5cf58077b53e011a64671583",
        });
        expect(result.docs).toHaveLength(20);
    });

    test("get error from getAllBookChapters() by not putting an id", async () => {
        try {
            const result = await andrewSDK.getAllBookChapters({
                limit: 2,
            });
        } catch (e) {
            expect(e.message).toEqual(
                "The book id is not valid or it was not specified properly"
            );
        }
    });
});

describe("movie api tests", () => {
    test("get 5 movies from getAllMovies()", async () => {
        const result = await andrewSDK.getAllMovies({ limit: 5 });
        expect(result.docs).toHaveLength(5);
    });
    test("get 1 movie from getOneMovie()", async () => {
        const result = await andrewSDK.getOneMovie({
            id: "5cd95395de30eff6ebccde5d",
        });
        expect(result.docs).toHaveLength(1);
    });

    test("get error from getOneMovie() by not putting an id", async () => {
        try {
            const result = await andrewSDK.getOneMovie();
        } catch (e) {
            expect(e.message).toEqual(
                "The movie id is not valid or it was not specified properly"
            );
        }
    });
});

describe("character api tests", () => {
    test("get 1 character from getAllCharacters()", async () => {
        const result = await andrewSDK.getAllCharacters({
            page: 1,
            limit: 20,
            filters: ["name=Gandalf"],
        });
        expect(result.docs).toHaveLength(1);
    });
    test("get 1 movie from getOneCharacter()", async () => {
        const result = await andrewSDK.getOneCharacter({
            id: "5cd99d4bde30eff6ebccfea0",
        });
        expect(result.docs).toHaveLength(1);
    });

    test("get error from getOneCharacter() by not putting an id", async () => {
        try {
            const result = await andrewSDK.getOneCharacter();
        } catch (e) {
            expect(e.message).toEqual(
                "The character id is not valid or it was not specified properly"
            );
        }
    });

    
});

describe("quote api tests", () => {
    test("get 15 movie quotes from getAllQuotes()", async () => {
        const result = await andrewSDK.getAllQuotes({
            page: 1,
            limit: 15,
            from: "MOVIE",
            id: "5cd95395de30eff6ebccde5d",
        });
        expect(result.docs).toHaveLength(15);
    });

    test("get error from getAllQuotes() by not putting an id with from: MOVIE", async () => {
        try {
            const result = await andrewSDK.getAllQuotes({
                page: 1,
                limit: 15,
                from: "MOVIE",
            });
        } catch (e) {
            expect(e.message).toEqual(
                "The movie id is not valid or it was not specified properly"
            );
        }
    });

    test("gets valid response for character quotes from getAllQuotes()", async () => {
        const result = await andrewSDK.getAllQuotes({
            page: 1,
            limit: 2,
            from: "CHARACTER",
            id: "6091b6d6d58360f988133b90",
        });
        expect(result.docs).toBeTruthy();
    });

    test("get 20 quotes from all quotes from getAllQuotes()", async () => {
        const result = await andrewSDK.getAllQuotes({ limit: 20 });
        expect(result.docs).toHaveLength(20);
    });

    test("get 1 quotes from  getOneQuote()", async () => {
        const result = await andrewSDK.getOneQuote({
            id: "5cd96e05de30eff6ebcce84c",
        });
        expect(result.docs).toHaveLength(1);
    });

    test("get error from getOneQuote() by not putting an id", async () => {
        try {
            const result = await andrewSDK.getOneQuote();
        } catch (e) {
            expect(e.message).toEqual(
                "The quote id is not valid or it was not specified properly"
            );
        }
    });


});

describe("chapter api tests", () => {
    test("get 12 chapters from getAllChapters()", async () => {
        const result = await andrewSDK.getAllChapters({ page: 2, limit: 12 });
        expect(result.docs).toHaveLength(12);
    });

    test("get 1chapter from all quotes from getOneChapter()", async () => {
        const result = await andrewSDK.getOneChapter({
            id: "6091b6d6d58360f988133b90",
        });
        expect(result.docs).toHaveLength(1);
    });

    test("get error from getOneChapter() by not putting an id", async () => {
        try {
            const result = await andrewSDK.getOneChapter();
        } catch (e) {
            expect(e.message).toEqual(
                "The chapter id is not valid or it was not specified properly"
            );
        }
    });
});

describe("bad token tests", () => {
    test("get bad token error", () => {
        try {
            const badSDK = new AndrewTaingSdk({ accessToken: 12345 });
        } catch (e) {
            expect(e.message).toMatch("Invalid access Token format");
        }
    });
});
