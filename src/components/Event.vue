<template id="events-list-item">
    <f7-list-item swipeout overswipe
                  :title="event.name"
                  :subtitle="event.lName"
                  :after="event.score">
        <f7-swipeout-actions left>
            <f7-swipeout-button
                    :delete="event.removable"
                    :close="true"
                    :color="(event.favorite ? 'red' : 'green')"
                    @click="toggleFavorite(event.id)">

                <i class="f7-icons size-16">{{event.favorite ? 'star_fill' : 'star'}}</i>
            </f7-swipeout-button>
        </f7-swipeout-actions>
        <div class="swipeout-content">
            <event-coefficients v-bind:id="event.id"></event-coefficients>
        </div>
    </f7-list-item>
</template>
<script>
    import {EVENT_FAVORITE_TOGGLE} from '../actions';
    import Vuex from 'vuex';
    import Coefficients from './Coefficients.vue';

    export default {
        template: '#events-list-item',
        methods: Vuex.mapActions({
            toggleFavorite: EVENT_FAVORITE_TOGGLE
        }),
        props: {
            event: {
                type: Object,
                required: true
            },
            removable: {
                type: Boolean,
                default: false
            }
        },
        components: {
            'event-coefficients': Coefficients
        }
    };
</script>
