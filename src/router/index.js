import Vue from 'vue'
import Router from 'vue-router'

import pageView from '@/pages/pageView'
import Home from '@/pages/home'
import Things from '@/pages/things'
import Personal from '@/pages/personal'
import superPersonal from '@/components/superpages/superPersonal'
import superpublished from '@/components/superpages/superpublished'
import superpublish from '@/components/superpages/superpublish'
import Pictoral from '@/pages/pictoral'
import pictoral_today from '@/pages/pictoral_today'
import Comment from '@/pages/comment'
import About from '@/pages/about'
import login from '@/components/login/login'
import superlogin from '@/components/login/superlogin'
import register from '@/components/register/register'
import myfocus from '@/pages/myfocus'
import myfocusauthor from '@/pages/myfocusauthor'
import mylost from '@/pages/mylost'
import myfound from '@/pages/myfound'
import mychat from '@/pages/mychat'
import mymsg from '@/pages/mymsg'
import all from '@/pages/all'
import kown from '@/pages/kown'
import allarticle from '@/pages/allarticle'

import publish from '@/pages/publish'
import publish_lost from '@/pages/publish_lost'
import publish_chat from '@/pages/publish_chat'
import publish_all from '@/pages/publish_all'
import chat from '@/pages/chat'
import found from '@/pages/found'
import lost from '@/pages/lost'
import search from '@/pages/search'

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
      path:'/superlogin',
      name:'superlogin',
      component:superlogin
    },
      {
      path:'/superPersonal',
      name:'superPersonal',
      component:superPersonal
    },
     {
      path:'/superpublished',
      name:'superpublished',
      component:superpublished
    },
     {
      path:'/superpublish',
      name:'superpublish',
      component:superpublish
    },
    {
      path:'/register',
      name:'register',
      component:register
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
                path:'/pictoral_today/',
                name:'pictoral_today',
                meta:{index:1},
                component:pictoral_today
              },
              {
                path:'/all/',
                name:'all',
                meta:{index:1},
                component:all
              },
              {
                path:'/things/',
                name:'things',
                meta:{index:1},
                component:Things
              },
              {
                path:'/publish/',
                name:'publish',
                meta:{index:1},
                component:publish
              },
               {
                path:'/publish_lost/',
                name:'publish_lost',
                meta:{index:1},
                component:publish_lost
              },
               {
                path:'/publish_chat/',
                name:'publish_chat',
                meta:{index:1},
                component:publish_chat
              },
              {
                path:'/publish_all/',
                name:'publish_all',
                meta:{index:1},
                component:publish_all
              },
              {
                path:'/personal',
                name:'personal',
                meta:{index:1},
                component:Personal
              },
              
              {
                path:'/myfocus',
                name:'myfocus',
                meta:{index:1},
                component:myfocus
              },
               {
                path:'/myfocusauthor',
                name:'myfocusauthor',
                meta:{index:1},
                component:myfocusauthor
              },
                {
                path:'/allarticle/:item',
                name:'allarticle',
                meta:{index:1},
                component:allarticle
              },
               {
                path:'/mylost',
                name:'mylost',
                meta:{index:1},
                component:mylost
              },
               {
                path:'/myfound',
                name:'myfound',
                meta:{index:1},
                component:myfound
              },
               {
                path:'/mychat',
                name:'mychat',
                meta:{index:1},
                component:mychat
              },
               {
                path:'/mymsg',
                name:'mymsg',
                meta:{index:1},
                component:mymsg
              },
              {
                path:'/search',
                name:'search',
                meta:{index:1},
                component:search
              },
               {
                path:'/kown',
                name:'kown',
                meta:{index:1},
                component:kown
              },
              {
                path:'/lost',
                name:'lost',
                meta:{index:1},
                component:lost
              },
              {
                path:'/found',
                name:'found',
                meta:{index:1},
                component:found
              },
              {
                path:'/chat',
                name:'chat',
                meta:{index:1},
                component:chat
              },
          ]
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
