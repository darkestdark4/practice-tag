<script>
import IconVaccinated from 'src/assets/image/icon_vaccinated.png'
import IconNonVaccinated from 'src/assets/image/icon_non_vaccinated.png'

export default {
  props: {
    vaccine: { type: String, default: '' }
  },
  data () {
    return {
      IconVaccinated,
      IconNonVaccinated
    }
  },
  computed: {
    icon () {
      if (
        this.vaccine === 'Planning to get vaccinated' ||
        this.vaccine === 'Not getting vaccinated'
      ) {
        return IconNonVaccinated
      } else if (
        this.vaccine === 'Fully vaccinated' ||
        this.vaccine === 'Waiting on additional dose' ||
        this.vaccine === 'Vaccine booster'
      ) {
        return IconVaccinated
      }

      return null
    }
  }
}
</script>

<template>
  <div class="col">
    <q-img :src="icon" width="12px" height="12px" class="q-mr-xs" />
    <span class="text-white" style="font-size: 12px">
      {{ vaccine }}
    </span>
  </div>
</template>
