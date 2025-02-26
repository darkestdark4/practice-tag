<script>
export default {
  props: {
    mainColor: { type: String },
    title: { type: String },
    icon: { type: String },
    isDisabled: { type: Boolean, default: false }
  }
}
</script>

<template>
  <q-item clickable v-ripple>
    <q-item-section avatar>
      <q-icon
        :name="icon"
        :style="`color: ${mainColor}`"
        :class="isDisabled ? 'text-grey cursor-not-allowed' : ''"
      />
    </q-item-section>
    <q-item-section
      class="text-left"
      :class="isDisabled ? 'cursor-not-allowed text-grey' : ''"
      :style="`color: ${mainColor}`"
    >
      {{ title }}
    </q-item-section>
  </q-item>
</template>
