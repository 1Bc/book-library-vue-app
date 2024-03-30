import {createRouter,createWebHashHistory} from "vue-router";
import Authors from "@/views/Author/AuthorMenu.vue";
import AuthorEdit from "@/views/Author/AuthorEdit.vue";
import AuthorCreate from "@/views/Author/AuthorCreate.vue";
import AuthorList from "@/views/Author/AuthorList.vue";

const router = createRouter({
        history: createWebHashHistory(),

        routes:[
            {
                path: '/authors',
                component: Authors,
                children:[
                    {path: '', component: AuthorList},
                    {path: ':index/edit', component: AuthorEdit, props:true},
                    {path: 'create', component: AuthorCreate}
                ]
            },

        ]
    }
)

export default router