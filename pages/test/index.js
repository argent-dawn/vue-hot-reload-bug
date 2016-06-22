require('./index.css');
const Vue = require('vue');
const Header = require('../../components/commons/test-header/index.vue');
const Footer = require('../../components/commons/test-footer/index.vue');

new Vue({
    el: 'body',
    components: {
        'test-header': Header,
        'test-footer': Footer
    }
});
