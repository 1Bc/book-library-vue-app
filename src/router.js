import {createRouter,createWebHashHistory} from "vue-router";
import Authors from "@/views/Author/AuthorMenu.vue";
import AuthorEdit from "@/views/Author/AuthorEdit.vue";
import AuthorCreate from "@/views/Author/AuthorCreate.vue";
import AuthorList from "@/views/Author/AuthorList.vue";

const routes = [
    {
        path: '/authors',
        component: Authors,
        children:[
            {path: '', component: AuthorList},
            {path: ':index/edit', component: AuthorEdit, props:true},
            {path: 'create', component: AuthorCreate}
        ]
    },
    {
        path: '/readers',
        component: () => import('@/views/Reader/ReaderMenu.vue'),
        children: [
            { path: '', component: () => import('@/views/Reader/ReaderList.vue') },
            { path: 'edit/:id', name: 'ReaderEdit', component: () => import('@/views/Reader/ReaderEdit.vue'), props: true },
            { path: 'create', component: () => import('@/views/Reader/ReaderCreate.vue') }
        ]
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
