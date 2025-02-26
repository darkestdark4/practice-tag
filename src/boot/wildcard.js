// import something here
import axios from 'axios'

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async ({ app, router, Vue, store }) => {
  const host = window.location.host
  const parts = host.split('.')
  if (parts.length > 1) {
    const endpoint = `${process.env.API}`
    const cid = 'mjVmBSJ31Hx2Ag9GCOUS'
    const username = parts[0]
    await axios
      .get(`${endpoint}/api/${cid}/member/${username}`)
      .then((response) => {
        if (response.data.status === true) {
          if (response.data.member.member_status === 'active') {
            const member = response.data.member

            const host = window.location.host
            const expiredPage =
              window.location.protocol + '//' + host + '/expired-member'
            if (member.is_expired && window.location.href !== expiredPage) {
              window.location.href =
                window.location.protocol + '//' + host + '/expired-member'
            }
            // if (response.data.status) {
            store.dispatch('userdata/submitUser', member)
            store.dispatch('userdata/submitCompany', member.company[0])
            if (member.corporate) {
              store.dispatch('userdata/submitCorporate', member.corporate)
              store.dispatch(
                'userdata/submitMainColor',
                member.corporate.corporate_main_color
              )
              store.dispatch(
                'userdata/submitSecondaryColor',
                member.corporate.corporate_secondary_color
              )
              if (member.corporate.background) {
                store.dispatch(
                  'userdata/submitBackground',
                  member.corporate.background
                )
              }
            }

            window.localStorage.setItem('user', JSON.stringify(member))
          } else {
            window.location.href = 'https://tagid.ai/not-found'
          }
        } else {
          window.location.href = 'https://tagid.ai/not-found'
        }
      })
  } else {
    window.location.href = 'https://tagid.ai'
  }
}
