<template>
  <q-card class="bg-white border-radius-10px">
    <div class="q-pa-lg q-my-md">
      <div class="q-mb-sm text-h6 text-center font-proxima-nova-alt"
        :style="`color: ${$store.state.userdata.user.secondary_color ? $store.state.userdata.user.secondary_color : '#116C54'}`">
        Biography</div>
      <div class="font-proxima-nova-alt">
        <span v-html="$store.state.userdata.user.biography"></span>
      </div>
    </div>
  </q-card>
</template>
