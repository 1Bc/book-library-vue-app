const apiPath = 'http://localhost:8080/api/v1/';
const perPage = 20;

class RentalService {
    async getAll(page) {
        const path = apiPath + `rentals/pages?page=${page}&perPage=${perPage}`;

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

    async getRentalPages() {
        const path = apiPath + `rentals/pages/count?perPage=${perPage}`;

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

    async getRental(id) {
        const path = `${apiPath}rentals/${id}`;

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

    async postRental(reqBody) {
        const path = `${apiPath}rentals`;

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

    async updateRental(reqBody, id) {
        const path = `${apiPath}rentals/${id}`;

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

    async deleteRental(id) {
        const path = `${apiPath}rentals/${id}`;

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

export default new RentalService();
