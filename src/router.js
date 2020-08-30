import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login";
import Register from "@/components/Register";
import UserBoard from "@/components/UserBoard";
import Admin from "@/components/Admin";
import AppLayout from '@/layouts/App.vue';
import PublicLayout from '@/layouts/Public.vue';
import Home from "@/views/Home";
Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: PublicLayout,
      children: [
        {
          path: '',
          component: Home,
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: PublicLayout,
      meta: {
        guest: true
      },
      children: [
        {
          path: '',
          component: Login,
        },
      ],
    },
    {
      path: "/register",
      name: "register",
      component: PublicLayout,
      meta: {
        guest: true
      },
      children: [
        {
          path: '',
          component: Register,
        },
      ],
    },
    {
      path: "/dashboard",
      name: "userboard",
      component: AppLayout,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '',
          component: UserBoard,
        },
      ],
    },
    {
      path: "/admin",
      name: "admin",
      component: AppLayout,
      meta: {
        requiresAuth: true,
        is_admin: true
      },
      children: [
        {
          path: '',
          component: Admin,
        },
      ],
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt") == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath }
      });
    } else {
      let user = JSON.parse(localStorage.getItem("user"));
      if (to.matched.some(record => record.meta.is_admin)) {
        if (user.is_admin == 1) {
          next();
        } else {
          next({ name: "userboard" });
        }
      } else {
        next();
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem("jwt") == null) {
      next();
    } else {
      next({ name: "userboard" });
    }
  } else {
    next();
  }
});

export default router;
