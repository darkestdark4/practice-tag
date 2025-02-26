<script>
import MenuHomeItem from 'src/components/Menu/Home/Item.vue'

export default {
  components: {
    MenuHomeItem
  },
  props: {
    mainColor: { type: String },
    corporateID: { type: Number },
    commerce: { type: String }
  },
  methods: {
    switchComponent (val) {
      this.$emit('toggleMenuComponent', val)
    }
  }
}
</script>

<template>
  <q-list class="text-secondary">
    <div @click="switchComponent('profile')">
      <MenuHomeItem
        :mainColor="mainColor"
        icon="assignment_ind"
        title="Card Profile"
      />
    </div>
    <div @click="switchComponent('bio')">
      <MenuHomeItem
        :mainColor="mainColor"
        icon="person_outline"
        title="Detail Bio"
      />
    </div>
    <div @click="switchComponent('contact')" v-show="corporateID != 48">
      <MenuHomeItem
        :mainColor="mainColor"
        icon="send"
        title="Contact"
      />
    </div>
    <div @click="switchComponent('connect')" v-show="corporateID != 48">
      <MenuHomeItem
        :mainColor="mainColor"
        icon="mdi-recycle-variant"
        title="Connect"
      />
    </div>
    <div @click="switchComponent('share')" v-show="corporateID != 48">
      <MenuHomeItem
        :mainColor="mainColor"
        icon="share"
        title="Share"
      />
    </div>
    <div @click="commerce ? switchComponent('shop') : false">
      <MenuHomeItem
        :isDisabled="commerce ? false : true"
        :mainColor="mainColor"
        icon="mdi-shopping-outline"
        title="Shop"
      />
    </div>
    <div @click="switchComponent('schedule')" v-show="corporateID != 48">
      <MenuHomeItem
        :mainColor="mainColor"
        icon="mdi-monitor-dashboard"
        title="Add Schedule"
      />
    </div>
    <div @click="switchComponent('save_card')" v-show="corporateID != 48">
      <MenuHomeItem
        :mainColor="mainColor"
        icon="save"
        title="Save Card"
      />
    </div>
    <div @click="switchComponent('shortcut')" v-show="corporateID != 48">
      <MenuHomeItem
        :mainColor="mainColor"
        icon="link"
        title="Shortcut"
      />
    </div>
    <div @click="switchComponent('edit_profile')" v-show="corporateID != 48">
      <MenuHomeItem
        :mainColor="mainColor"
        icon="login"
        title="Edit Profile"
      />
    </div>
  </q-list>
</template>
