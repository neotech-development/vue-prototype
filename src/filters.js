// @flow
import Vue from 'vue';

export default Vue.filter('fixed', (number: number, length: number) => Number(number).toFixed(length));
