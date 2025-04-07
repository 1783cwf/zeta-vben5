import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    name: 'VbenAbout',
    path: '/vben-admin/about',
    component: () => import('#/views/_core/about/index.vue'),
    meta: {
      icon: 'lucide:copyright',
      title: $t('page.vben.about'),
    },
  },
  // {
  //   component: BasicLayout,
  //   meta: {
  //     icon: VBEN_LOGO_URL,
  //     order: 9999,
  //     title: $t('page.vben.project'),
  //   },
  //   name: 'VbenProject',
  //   path: '/vben-admin',
  //   children: [
  // {
  //   name: 'VbenDocument',
  //   path: '/vben-admin/document',
  //   component: IFrameView,
  //   meta: {
  //     icon: 'lucide:book-open-text',
  //     link: VBEN_DOC_URL,
  //     title: $t('page.vben.document'),
  //   },
  // },
  // {
  //   name: 'VbenGithub',
  //   path: '/vben-admin/github',
  //   component: IFrameView,
  //   meta: {
  //     icon: 'mdi:github',
  //     link: VBEN_GITHUB_URL,
  //     title: 'Github',
  //   },
  // },
  // ],
  // },
];

export default routes;
