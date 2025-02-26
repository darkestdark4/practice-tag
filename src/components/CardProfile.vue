<template>
  <q-card
    v-if="user"
    class="border-radius-10px"
    :style="{ background: user.main_color || defaultMainColor }"
  >
    <div class="q-pa-lg q-my-md">
      <div class="column">
        <div class="col text-white text-h5 font-monserrat">
          {{ user.full_name }}
        </div>
        <div class="col text-white text-h6 font-proxima-nova-alt">
          {{ user.profile || '-' }}
        </div>
        <div class="col q-mt-md text-white font-proxima-nova-alt">Phone:</div>
        <div class="col text-white text-bold font-monserrat">
          {{ `${user.phone_code}${user.phone_number}` }}
        </div>
        <div class="col q-mt-md text-white font-proxima-nova-alt">Email:</div>
        <div class="col text-white text-bold font-monserrat">
          {{ user.email }}
        </div>
      </div>
    </div>
  </q-card>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return null
      }
    },
    defaultMainColor: {
      type: String
    }
  }
}
</script>
