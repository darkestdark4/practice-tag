<template>
  <div class="col" v-if="data && data.id !== 6">
    <q-img
      width="12px"
      height="12px"
      class="q-mr-xs"
      :src="IconVaccinated"
      v-if="data.count_as_done"
    />
    <q-img
      v-else
      width="12px"
      height="12px"
      class="q-mr-xs"
      :src="IconNonVaccinated"
    />
    <span class="text-white" style="font-size: 12px">
      {{ data.name }}
    </span>
  </div>
</template>

<script>
import IconVaccinated from 'src/assets/image/icon_vaccinated.png'
import IconNonVaccinated from 'src/assets/image/icon_non_vaccinated.png'

export default {
  data () {
    return {
      IconVaccinated,
      IconNonVaccinated
    }
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          vaccine: {
            id: null,
            count_as_done: false,
            name: null
          }
        }
      }
    }
  }
}
</script>
