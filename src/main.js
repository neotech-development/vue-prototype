import 'framework7-icons/css/framework7-icons.css';
import 'framework7';

import Vue from 'vue';
import Meta from 'vue-meta';
import routes from './routes';
import Framework7Vue from 'framework7-vue';
import App from './App';
import './filters';

const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

if (isIos) {
    require('framework7/dist/css/framework7.ios.min.css');
    require('framework7/dist/css/framework7.ios.colors.min.css');
} else {
    require('framework7/dist/css/framework7.material.min.css');
    require('framework7/dist/css/framework7.material.colors.min.css');
}

Vue.use(Meta);
Vue.use(Framework7Vue);
Vue.config.productionTip = true;
Vue.config.silent = false;
Vue.config.devtools = true;
Vue.config.performance = true;

new Vue({
    el: '#app',
    render: h => h(App),

    framework7: {
        el: '#app',
        root: '#app',
        material: !isIos,
        animateNavBackIcon: true,
        routes: routes
    },

    metaInfo: {
        // if no subcomponents specify a metaInfo.title, this title will be used
        title: 'Leonbets',
        // all titles will be injected into this template
        titleTemplate: '%s | The !Best betting site',
        meta: [
            {
                name: 'viewport',
                content: [
                    'width=device-width',
                    'initial-scale=1',
                    'maximum-scale=1',
                    'minimum-scale=1',
                    'user-scalable=no',
                    'minimal-ui'
                ].join(', ')
            },
            {
                name: 'apple-mobile-web-app-capable',
                content: 'yes'
            },
            {
                name: 'apple-mobile-web-app-status-bar-style',
                content: 'black'
            }

        ]
    }
});
