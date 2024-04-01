const apiPath = 'http://localhost:8080/api/v1/'
const perPage = 20

export default {
    async getAllAuthors(page){
        const path = apiPath+`authors/pages?page=${page}&perPage=${perPage}`

        try{
            const response = await fetch(path);
            return  await response.json();
        }catch (e){
            console.log(e);
            alert("Unexpected error on API call");
            return []
        }
    },

    async getPageCount(){
        const path = apiPath+`authors/pages/count?perPage=${perPage}`

        try{
            const response = await fetch(path);
            return  await response.json();
        }catch (e){
            console.log(e);
            alert("Unexpected error on API call");
            return 0
        }
    },

    async getAuthor(id){
        const path = apiPath+'authors/'+id

        try{
            const response = await fetch(path);
            return  await response.json();
        }catch (e){
            console.log(e);
            alert("Unexpected error on API call");
            return []
        }
    },

    async postAuthor(requestBody){
        const path = apiPath+'authors'

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
    },

    async updateAuthor(requestBody,index){
        const path = apiPath+'authors/'+index

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
    },

    async deleteAuthor(index){
        const path = apiPath+'authors/'+index

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
}
