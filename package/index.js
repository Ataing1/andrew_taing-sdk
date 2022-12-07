const joinUrl = require("proper-url-join");
const axios = require("axios");

function rejectValidation(module, param) {
    return Promise.reject({
        status: 0,
        message: `The ${module} ${param} is not valid or it was not specified properly`,
    });
}

class ApiCall {
    /**
     *
     * @param {string} baseUrl - A string with the base URL for account
     * @param {string} accessToken - Access Token
     */
    constructor(baseURL, accessToken) {
        this.baseURL = baseURL;
        this.accessToken = accessToken;
    }

    async get(url) {
        let callURL = joinUrl(this.baseURL, url, { trailingSlash: true });

        if (!this.accessToken && !data.bookQuery) {
            throw new Error("No token found");
        }

        const config = {
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            },
        };
        
        return axios
            .get(callURL, config)
            .then((result) => {
                return result.data;
            })
            .catch((err) => {
                return Promise.reject({
                    status: err.response.status,
                    message: err.response.statusText,
                });
            });
    }
}

class AndrewTaingSdk {
    /**
     *
     * @param {string} options.accessToken -- Access Token
     *
     * @param {Object} options -- An Object containing the access keys
     */

    constructor(options) {
        this.baseURL = "https://the-one-api.dev/v2";

        if (typeof options.accessToken === "string") {
            this.accessToken = options.accessToken;
        } else {
            throw new Error("Invalid access Token format");
        }

        this.api = new ApiCall(this.baseURL, options.accessToken);
    }

    getAllBooks(params = {}) {
        const queryParameters = this.createQueryFromParameters(params);
        return this.api.get(`/book${queryParameters}`);
    }

    getOneBook(params = {}) {
        if (!params.id) {
            return rejectValidation("book", "id");
        }
        return this.api.get(`/book/${params.id}`);
    }

    getAllBookChapters(params = {}) {
        if (!params.id) {
            return rejectValidation("book", "id");
        }
        const queryParameters = this.createQueryFromParameters(params);
        return this.api.get(`/book/${params.id}/chapter${queryParameters}`);
    }

    getAllMovies(params = {}) {
        const queryParameters = this.createQueryFromParameters(params);
        return this.api.get(`/movie${queryParameters}`);
    }
    getOneMovie(params = {}) {
        if (!params.id) {
            return rejectValidation("movie", "id");
        }
        return this.api.get(`/movie/${params.id}`);
    }

    getAllCharacters(params = {}) {
        const queryParameters = this.createQueryFromParameters(params);
        return this.api.get(`/character${queryParameters}`);
    }

    getOneCharacter(params = {}) {
        if (!params.id) {
            return rejectValidation("character", "id");
        }
        return this.api.get(`/character/${params.id}`);
    }

    getAllQuotes(params = {}) {
        //default getQuotes to get All quotes
        const queryParameters = this.createQueryFromParameters(params);
        if (!params.from) {
            params.from = "ALL";
        }

        if (params.from == "MOVIE") {
            if (!params.id) {
                return rejectValidation("movie", "id");
            }
            return this.api.get(`/movie/${params.id}/quote${queryParameters}`);
        }

        if (params.from == "CHARACTER") {
            if (!params.id) {
                return rejectValidation("character", "id");
            }
            return this.api.get(
                `/character/${params.id}/quote${queryParameters}`
            );
        }

        if (params.from == "ALL") {
            return this.api.get(`/quote${queryParameters}`);
        }
    }

    getOneQuote(params = {}) {
        if (!params.id) {
            return rejectValidation("quote", "id");
        }
        return this.api.get(`/quote/${params.id}`);
    }

    getAllChapters(params = {}) {
        const queryParameters = this.createQueryFromParameters(params);
        return this.api.get(`/chapter${queryParameters}`);
    }

    getOneChapter(params = {}) {
        if (!params.id) {
            return rejectValidation("chapter", "id");
        }
        return this.api.get(`/chapter/${params.id}`);
    }

    createQueryFromParameters(params = {}) {
        let querys = [];
        if (params.limit) {
            if (typeof params.limit !== "number") {
                return rejectValidation("limit", "value");
            }
            querys.push("limit=" + params.limit);
        }
        if (params.page) {
            if (typeof params.page !== "number") {
                return rejectValidation("page", "value");
            }
            querys.push("page=" + params.page);
        }
        if (params.offset) {
            if (typeof params.offset !== "number") {
                return rejectValidation("offset", "value");
            }
            querys.push("offset=" + params.offset);
        }

        if (params.sort) {
            //validate manditory key
            if (!params.sort.key || typeof params.sort.key !== "string") {
                return rejectValidation("sort", "value");
            }
            //validate optional direction
            let direction = "asc";
            if (params.sort.direction) {
                if (typeof params.sort.direction !== "string") {
                    return rejectValidation("sort", "value");
                }
                if (
                    params.sort.direction !== "asc" ||
                    params.sort.direction !== "desc"
                ) {
                    return rejectValidation("sort direction", "value");
                }
                direction = params.sort.direction;
            }

            querys.push(`sort=${params.sort.key}:${direction}`);
        }

        if (params.filters) {
            if (!Array.isArray(params.filters)) {
                return rejectValidation("filters", "value");
            }
            params.filters.forEach((filter) => {
                querys.push(filter);
            });
        }
        if (querys.length > 0) {
            return "?" + querys.join("&");
        }
        return "";
    }
}



module.exports = AndrewTaingSdk;
