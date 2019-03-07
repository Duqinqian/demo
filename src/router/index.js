import Vue from 'vue'
import Router from 'vue-router'

import pageView from '@/pages/pageView'
import Home from '@/pages/home'
import Things from '@/pages/things'
import Designer from '@/pages/designer'
import Personal from '@/pages/personal'
import Pictoral from '@/pages/pictoral'
import Details from '@/pages/details'
import Comment from '@/pages/comment'
import About from '@/pages/about'
import login from '@/components/login/login'

import publish from '@/pages/publish'
import notes from '@/pages/notes'
import question from '@/pages/question'
import fun from '@/pages/fun'

import Prearticle from '@/pages/prearticle'

Router.prototype.goBack = function(){
	this.isBack = true;
	window.history.go(-1);
};

Vue.use(Router);

const routers = new Router({
  routes: [
    {
      path:'/login',
      name:'login',
      component:login
    },
    {
      path:'',
      name:'',
      component:pageView,
      children:[
        {
          path:'/',
          name:'',
          component:Home,
          children:[
           {
            path:'',
                name:'pictoral',
                meta:{index:1},
                component:Pictoral
              },
              {
                path:'/things',
                name:'things',
                meta:{index:1},
                component:Things
              },
              {
                path:'/publish',
                name:'publish',
                meta:{index:1},
                component:publish
              },
              {
                path:'/notes',
                name:'notes',
                meta:{index:1},
                component:notes
              },
               {
                path:'/question',
                name:'question',
                meta:{index:1},
                component:question
              },
              {
                path:'/fun',
                name:'fun',
                meta:{index:1},
                component:fun
              },
              {
                path:'/designer',
                name:'designer',
                meta:{index:1},
                component:Designer
              },
              {
                path:'/personal',
                name:'personal',
                meta:{index:1},
                component:Personal
              },
              {
                path:'/prearticle',
                name:'prearticle',
                meta:{index:1},
                component:Prearticle
              },
          ]
        },
        {
          path:'/details/:id',
          name:'details',
          meta:{index:2},
          component:Details
        },
        {
          path:'/comment/:id',
          name:'comment',
          meta:{index:2},
          component:Comment
        },
        {
          path:'/about',
          name:'about',
          meta:{index:2},
          component:About
        }
      ]
    }
  ]
})

routers.beforeEach(function (to, from, next) { 
    document.body.scrollTop = document.documentElement.scrollTop = 0
    next()
});

export default routers;
