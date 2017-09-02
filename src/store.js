// @flow
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const stringify = JSON.stringify;

import {
    EVENTS_FETCH,
    EVENTS_UPSERT,
    EVENT_UPSERT,
    EVENT_UPDATE,
    EVENT_FAVORITE_TOGGLE,
    EVENT_COEFFICIENT_TOGGLE,
    EVENT_CREATE
} from './actions';

const assign = Object.assign;

const tryTo = (fn, defaultValue) => {
    try {
        return fn();
    } catch (e) {
        return defaultValue;
    }
};

const eventsStore = {

    // Data.
    state: {
        events: {},
        raw: null
    },

    getters: {

        coefficients: (state, getters) => getters.list.reduce((data, event) =>
            ({[event.id]: event.data1X2, ...data}), {}),

        // Get events list.
        list: (state) => Object.keys(state.events).map(id => state.events[id]),

        // Get favorite events list.
        favorites: (state, getters) => getters.list.filter(event => event.favorite),

        // Get grouped events as object.
        grouped: (state, getters) => getters.list.reduce((groups, event) => {
            const gid = event.groupId;
            const id = event.id;
            if (!groups[gid]) groups[gid] = {dict: {}, id: gid, title: event.groupName};
            groups[gid].dict[id] = event;
            return groups;
        }, {})

    },

    // Sync operations.
    mutations: {

        [EVENT_UPDATE](state, newEvent) {

            const id = newEvent.id;
            const curEvent = state.events[id];

            // Merge events.
            const updatedEvent = assign({}, curEvent, newEvent, {
                data1X2: {
                    '1': assign({}, Object(curEvent.data1X2)['1'], Object(newEvent.data1X2)['1']),
                    'x': assign({}, Object(curEvent.data1X2)['x'], Object(newEvent.data1X2)['x']),
                    '2': assign({}, Object(curEvent.data1X2)['2'], Object(newEvent.data1X2)['2'])
                }
            });

            const updatedRaw = stringify(updatedEvent);
            if (updatedRaw !== curEvent.raw) {

                Vue.set(state.events, id, updatedEvent);
            }
        },

        [EVENT_CREATE](state, event) {
            Vue.set(state.events, event.id, event);
        }

    },
    // Async operations.
    actions: {

        [EVENTS_UPSERT]({dispatch}, events) {
            events.forEach(event => dispatch(EVENT_UPSERT, event));
        },

        [EVENT_UPSERT]({state, commit}, event) {
            if (event.id in state.events) {
                commit(EVENT_UPDATE, event);
            } else {
                commit(EVENT_CREATE, event);
            }
        },

        [EVENTS_FETCH]({state, dispatch}) {

            return fetch('/static/live.json')
            // Parse response.
                .then(resp => resp.text())
                // Check response is changed.
                .then(raw => {

                    let events = state.raw === raw ? [] : tryTo(() => JSON.parse(state.raw = raw), []);
                    // Response has been changed.
                    if (events.length) {
                        dispatch(EVENTS_UPSERT, events.map(event =>
                            // Normalize each event.
                            Object.assign(event, {
                                score: event.score
                                    .replace(/\s/g, ''),
                                data1X2: {
                                    '1': event.data1X2[0],
                                    'x': event.data1X2[1],
                                    '2': event.data1X2[2]
                                }
                            })));
                    }
                }, () => {
                });
        },

        [EVENT_FAVORITE_TOGGLE]({state, commit}, id) {
            const favorite = !state.events[id].favorite;
            commit(EVENT_UPDATE, {
                id,
                favorite
            });
        },

        [EVENT_COEFFICIENT_TOGGLE]({state, commit}, {id, type}) {
            const selected = !state.events[id].data1X2[type].selected;
            commit(EVENT_UPDATE, {
                id,
                data1X2: {
                    [type]: {selected}
                }
            });
        }
    }
};

export default new Vuex.Store(eventsStore);
