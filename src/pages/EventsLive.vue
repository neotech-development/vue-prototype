<template id="page-events-live">
    <f7-page>
        <f7-navbar title="Live events" back-link="Back" sliding></f7-navbar>

        <f7-list accordion>
            <f7-list-item :accordion-item="favorites.length > 0" title="Favorites">
                <f7-list v-if="favorites.length > 0">
                    <events-item v-for="event in favorites" :key="event.id"
                                 v-if="event.favorite"
                                 v-bind:event="event"
                                 v-bind:removable="true"
                    ></events-item>
                </f7-list>
            </f7-list-item>

            <f7-list-item accordion-item v-for="group in grouped" :title="group.title" :key="group.id">
                <f7-accordion-content>
                    <f7-list>
                        <events-item v-for="event in group.dict" :key="event.id" v-bind:event="event"></events-item>
                    </f7-list>
                </f7-accordion-content>
            </f7-list-item>
        </f7-list>
    </f7-page>
</template>

<script>
    import Vue from 'vue';
    import Vuex from 'vuex';
    import {EVENTS_FETCH} from '../actions';
    import store from '../store';
    import Event from '../components/Event';

    export default Vue.component('page-events-live', {

        template: '#page-events-live',

        store: store,

        created: function () {
            this.fetchEvents();
            setInterval(this.fetchEvents, 1000);
        },

        computed: Vuex.mapGetters(['list', 'grouped', 'favorites']),

        methods: Vuex.mapActions({
            fetchEvents: EVENTS_FETCH
        }),

        components: {
            'events-item': Event
        }
    });
</script>
