<template>
    <q-page style="min-height:200px !important">
        <q-card :class="`${$store.state.style.isMobile ? 'constrain-mobile' : 'constrain-web'} border-radius-10px`" flat>
            <router-view />
        </q-card>
    </q-page>
</template>
