<template>
    <q-card :class="`${$store.state.style.isMobile ? 'constrain-mobile' : 'constrain-web'} border-radius-10px`" flat>
        <router-view />
    </q-card>
</template>
