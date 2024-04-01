import {createRouter,createWebHashHistory} from "vue-router";


const routes = [
    {
        path: '/authors',
        component: ()=>import("@/views/Author/AuthorMenu.vue"),
        children:[
            {path: '', component: ()=> import("@/views/Author/AuthorList.vue")},
            {path: ':index/edit', component: ()=>import("@/views/Author/AuthorEdit.vue"), props:true},
            {path: 'create', component: ()=>import("@/views/Author/AuthorCreate.vue")}
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
    {
        path: '/books',
        component: () => import('@/views/Book/BookMenu.vue'),
        children: [
            { path: '', component: () => import('@/views/Book/BookList.vue') },
            { path: ':index/edit',  component: () => import('@/views/Book/BookEdit.vue'), props: true },
            { path: 'create', component: () => import('@/views/Book/BookCreate.vue') }
        ]
    },
    {
        path: '/rentals',
        component: () => import('@/views/Rental/RentalMenu.vue'),
        children: [
            { path: '', component: () => import('@/views/Rental/RentalList.vue') },
            // { path: 'edit/:id', name: 'RentalEdit', component: () => import('@/views/Rental/RentalEdit.vue'), props: true },
            // { path: 'create', component: () => import('@/views/Rental/RentalCreate.vue') }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
