<template>

    <div id="app">
        <f7-statusbar></f7-statusbar>

        <sidemenu></sidemenu>
        <f7-views>
            <f7-view id="main-view" navbar-through :dynamic-navbar="true" main>

                <f7-navbar v-if="$theme.ios">
                    <f7-nav-left>
                        <f7-link icon="icon-bars" open-panel="left"></f7-link>
                    </f7-nav-left>
                    <f7-nav-center sliding>Leonbets</f7-nav-center>
                    <f7-nav-right>
                    </f7-nav-right>
                </f7-navbar>

                <f7-pages>
                    <f7-page>

                        <f7-navbar v-if="$theme.material">
                            <f7-nav-left>
                                <f7-link icon="icon-bars" open-panel="left"></f7-link>
                            </f7-nav-left>
                            <f7-nav-center sliding>Leonbets</f7-nav-center>
                        </f7-navbar>


                        <f7-block-title>Navigation</f7-block-title>
                        <f7-list>
                            <f7-list-item link="/live" title="Live"></f7-list-item>
                        </f7-list>
                    </f7-page>

                </f7-pages>
            </f7-view>
        </f7-views>
    </div>
</template>

<script>
    import Sidemenu from './components/Sidemenu.vue';

    export default {
        name: 'app',
        components: {
            sidemenu: Sidemenu
        }
    };
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    /* Sub list item */
    .list-block .list-block .item-content {
        font-size: 0.8em;
    }

    .size-16 {
        font-size: 16px;
    }

</style>
