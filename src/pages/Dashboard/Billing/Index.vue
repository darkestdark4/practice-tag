<template>
  <q-page>
    <div class="q-pa-md">
      <q-list>
        <q-item
          clickable
          v-ripple
          to="manage-billing/paket"
          class="q-py-md q-px-none">
          <q-item-section class="text-secondary font-proxima-nova-alt">Status Subscription</q-item-section>
          <q-item-section avatar>
            <q-icon name="navigate_next" color="dark"/>
          </q-item-section>
        </q-item>
        <q-separator />

        <q-item
          clickable
          v-ripple
          to="manage-billing/renewal"
          class="q-py-md q-px-none">
          <q-item-section class="text-secondary font-proxima-nova-alt">Renewal</q-item-section>
          <q-item-section avatar>
            <q-icon name="navigate_next" color="dark"/>
          </q-item-section>
        </q-item>
        <q-separator />

        <q-item
          clickable
          v-ripple
          to="manage-billing/upgrade-downgrade"
          class="q-py-md q-px-none">
          <q-item-section class="text-secondary font-proxima-nova-alt">Upgrade or Downgrade</q-item-section>
          <q-item-section avatar>
            <q-icon name="navigate_next" color="dark"/>
          </q-item-section>
        </q-item>
        <q-separator />

        <q-item
          clickable
          v-ripple
          to="manage-billing/invoice-history"
          class="q-py-md q-px-none">
          <q-item-section class="text-secondary font-proxima-nova-alt">Invoice / History</q-item-section>
          <q-item-section avatar>
            <q-icon name="navigate_next" color="dark"/>
          </q-item-section>
        </q-item>
        <q-separator />
      </q-list>
    </div>
  </q-page>
</template>

<script>
export default {
  mounted () {
    this.$store.dispatch('style/submitTitlePage', 'Manage Billing')
  }
}
</script>
