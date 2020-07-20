import Layout from '@/layout/Header'
import AppMain from '@/layout/AppMain'
import Scroll from '@/demo/BetterScroll/Scroll'


export default [
  {
    path: '/',
    component: Layout,
    routes: [
      {
        path: '/',
        exact: true,
        component: AppMain
      },
      {
        path: '/betterScroll/scroll',
        component: Scroll,
        name: 'BetterScroll-Scroll'
      },
      /* {
        path: '/singers',
        component: Singers,
      },
      {
        path: '/rank',
        component: Rank,
      }, */
    ],
  },
]
