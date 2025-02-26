<script>
import MenuList from 'src/components/Menu/Home/List.vue'

export default {
  components: {
    MenuList
  },
  props: {
    commerce: { type: String },
    corporateID: { type: Number },
    mainColor: { type: String }
  },
  methods: {
    toggleMenuComponent (val) {
      this.$emit('toggleMenuComponent', val)
    }
  }
}
</script>

<template>
  <q-page-sticky position="bottom-right" :offset="[25, 15]">
    <q-fab
      icon="add"
      color="white"
      direction="up"
      text-color="primary"
    >
      <q-fab-action flat>
        <q-card
          class="border-radius-10px"
          style="margin-right: 200px; width: 220px"
        >
          <q-card-section>
            <MenuList
              :commerce="commerce"
              :corporateID="corporateID"
              :mainColor="mainColor"
              @toggleMenuComponent="toggleMenuComponent"
            />
          </q-card-section>
        </q-card>
      </q-fab-action>
    </q-fab>
  </q-page-sticky>
</template>
