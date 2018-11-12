import Vue from 'vue'
import Router from 'vue-router'
// import User from './components/User.vue'
// import Classify from './components/Classify.vue'
// import Cart from './components/Cart.vue'
// import Message from './components/Message.vue'
// import Product from './components/Product.vue'
// import Indent from './components/Indent.vue'
// import Comments from './components/Comments.vue'
const User = resolve => {
    require.ensure(['./components/User.vue'], () => {
        resolve(require('./components/User.vue'));
    });
}
const Classify = resolve => {
    require.ensure(['./components/Classify.vue'], () => {
        resolve(require('./components/Classify.vue'));
    });
}
const Cart = resolve => {
    require.ensure(['./components/Cart.vue'], () => {
        resolve(require('./components/Cart.vue'));
    });
}
const Message = resolve => {
    require.ensure(['./components/Message.vue'], () => {
        resolve(require('./components/Message.vue'));
    });
}
const Product = resolve => {
    require.ensure(['./components/Product.vue'], () => {
        resolve(require('./components/Product.vue'));
    });
}
const Indent = resolve => {
    require.ensure(['./components/Indent.vue'], () => {
        resolve(require('./components/Indent.vue'));
    });
}
const Comments = resolve => {
    require.ensure(['./components/Comments.vue'], () => {
        resolve(require('./components/Comments.vue'));
    });
}
const Help = resolve => {
    require.ensure(['./components/Help.vue'], () => {
        resolve(require('./components/Help.vue'));
    });
}


Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'user',
            component: User
        },
        {
            path: '/classify',
            name: 'classify',
            component: Classify


            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            // component: () =>
            //     import ( /* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart
        },
        {
            path: '/message',
            name: 'message',
            component: Message
        },
        {
            path: '/comments',
            name: 'comments',
            component: Comments
        },
        {
            path: '/product',
            name: 'product',
            component: Product
        },
        {
            path: '/indent',
            name: 'indent',
            component: Indent
        },
        {
            path: '/help',
            name: 'help',
            component: Help
        },


    ]
})