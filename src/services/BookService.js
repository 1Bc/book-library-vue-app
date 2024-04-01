const apiPath = 'http://localhost:8080/api/v1/';
const perPageDefault = 20;

class BookService{
    async getAll(page, perPage=perPageDefault){
        const path = apiPath+`books/pages?page=${page}&perPage=${perPage}`

        try{
            const response = await fetch(path);
            return  await response.json();
        }catch (e){
            console.log(e);
            alert("Unexpected error on API call");
            return []
        }
    }

    async getBookPages(perPage= perPageDefault){
        const path = apiPath+`books/pages/count?perPage=${perPage}`

        try{
            const response = await fetch(path);
            return  await response.json();
        }catch (e){
            console.log(e);
            alert("Unexpected error on API call");
            return 0
        }
    }

    async getBook(id){
        const path = apiPath+'books/'+id

        try{
            const response = await fetch(path);
            return  await response.json();
        }catch (e){
            console.log(e);
            alert("Unexpected error on API call");
            return []
        }
    }

    async deleteBook(index){
        const path = apiPath+'books/'+index

        try{
            const response = await fetch(path,{
                method:'delete'
            });

            return response.ok;

        }catch (e){
            console.log(e);
            alert("Unexpected error on API call");
            return false
        }
    }

    async createBook(requestBody){
        const path = apiPath+'books'

        try{
            const response = await fetch(path,{
                method:'post',
                headers:{
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(requestBody)
            });

            return response.ok;

        }catch (e){
            console.log(e);
            alert("Unexpected error on API call");
            return false
        }
    }

    async updateBook(index, requestBody){
        const path = apiPath+'books/'+index

        try{
            const response = await fetch(path,{
                method:'put',
                headers:{
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(requestBody)
            });

            return response.ok;

        }catch (e){
            console.log(e);
            alert("Unexpected error on API call");
            return false
        }
    }


}

export default new BookService();
