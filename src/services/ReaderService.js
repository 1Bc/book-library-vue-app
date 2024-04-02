const apiPath = 'http://localhost:8080/api/v1/';
const perPageDefault = 20;

class ReaderService {
    async getAll(page, perPage = perPageDefault) {
        const path = apiPath + `readers/pages?page=${page}&perPage=${perPage}`;

        try {
            const response = await fetch(path);
            return await response.json();
        }
        catch (e) {
            // console.log(e);
            alert("Unexpected error on API call");
            return [];
        }
    }

    async getReaderPages(perPage= perPageDefault) {
        const path = apiPath + `readers/pages/count?perPage=${perPage}`

        try {
            const response = await fetch(path);
            return await response.json();
        }
        catch (e) {
            // console.log(e);
            alert("Unexpected error on API call");
            return 0;
        }
    }

    async getReader(id) {
        const path = `${apiPath}readers/${id}`;

        try {
            const response = await fetch(path);
            return await response.json();
        }
        catch (e) {
            // console.log(e);
            alert("Unexpected error on API call");
            return [];
        }
    }

    async postReader(reqBody) {
        const path = `${apiPath}readers`;

        try {
            const response = await fetch(path, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(reqBody)
            });

            return response.ok;
        }
        catch (e) {
            // console.log(e);
            alert("Unexpected error on API call");
            return false;
        }
    }

    async updateReader(id, reqBody) {
        const path = `${apiPath}readers/${id}`;

        try {
            const response = await fetch(path, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(reqBody)
            });

            return response.ok;
        }
        catch (e) {
            // console.log(e);
            alert("Unexpected error on API call");
            return false;
        }
    }

    async deleteReader(id) {
        const path = `${apiPath}readers/${id}`;

        try {
            const response = await fetch(path, {
                method: 'delete'
            });

            return response.ok;
        }
        catch (e) {
            // console.log(e);
            alert("Unexpected error on API call");
            return false;
        }
    }
}

export default new ReaderService();
