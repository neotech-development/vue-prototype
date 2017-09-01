<template id="event-coefficients">
    <f7-block>
        <f7-buttons>
            <f7-button v-for="(coefficient, type) in coefficients[id]" :key="type"
                       v-if="coefficient.odds"
                       :fill="coefficient.selected"
                       :text="coefficient.odds | fixed(2)"
                       @click="toggle({id, type})">
            </f7-button>
        </f7-buttons>
    </f7-block>
</template>
<script>
    import Vuex from 'vuex';
    import {EVENT_COEFFICIENT_TOGGLE} from '../actions';

    export default {
        computed: Vuex.mapGetters(['coefficients']),
        methods: Vuex.mapActions({
            toggle: EVENT_COEFFICIENT_TOGGLE
        }),
        props: {
            id: {
                type: Number,
                required: true
            }
        }
    };
</script>