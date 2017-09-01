<template>
    <f7-panel left reveal layout="dark">
        <f7-view id="left-panel-view" navbar-through :dynamic-navbar="true">
            <f7-navbar v-if="$theme.ios" title="Leonbets" sliding></f7-navbar>
            <f7-pages>
                <f7-page>
                    <f7-navbar v-if="$theme.ios" title="Leonbets" sliding></f7-navbar>
                    <f7-list>
                        <f7-list-item link="#" title="Registration"></f7-list-item>
                        <f7-list-item link="#" title="Contacts"></f7-list-item>
                        <f7-list-item link="#" title="Contacts"></f7-list-item>
                        <f7-list-item link="#" title="English"></f7-list-item>
                        <f7-list-item link="#" title="Slots"></f7-list-item>
                        <f7-list-item link="#" title="LIVE Dealer"></f7-list-item>
                        <f7-list-item link="#" title="Virtual Sports"></f7-list-item>
                        <f7-list-item link="#" title="Live Casino"></f7-list-item>
                        <f7-list-item link="#" title="TV Games"></f7-list-item>
                        <f7-list-item link="#" title="Cybersport"></f7-list-item>
                    </f7-list>
                </f7-page>
            </f7-pages>
        </f7-view>
    </f7-panel>
</template>
