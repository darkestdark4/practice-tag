export default {
  isRegistered: false,
  namespaced: true,

  state: {
    user: {
      api_token: null,
      background: null,
      client_id: null,
      commerce: null,
      company_contact_mobile: null,
      company_contact_phone: null,
      company_contact_website: null,
      company_description: null,
      company_logo: null,
      company_name: null,
      company_operational_office: null,
      company_production_office: null,
      corporate_id: null,
      created_at: null,
      deleted_at: null,
      email: null,
      enter_room: null,
      id: null,
      identity_number: null,
      instagram: null,
      is_admin: null,
      line: null,
      link_room: null,
      linkedin: null,
      logo: null,
      member_address: null,
      member_city: null,
      member_country: null,
      member_dob: null,
      member_email: null,
      member_first_name: null,
      member_gender: null,
      member_last_name: null,
      member_lob: null,
      member_middle_name: null,
      member_npwp: null,
      member_phone: null,
      member_state: null,
      member_status: null,
      password: null,
      phone_code: null,
      profil: null,
      reset_token: null,
      role: null,
      status_activation: null,
      updated_at: null,
      user_id: null,
      username: null,
      youtube: null,
      expired_date: null,
      main_color: null,
      secondary_color: null
    },
    company: {
      id: null,
      member_id: null,
      order: null,
      company_name: null,
      company_department: null,
      company_division: null,
      company_address: null,
      company_country: null,
      company_state: null,
      company_city: null,
      company_postal_code: null,
      priority: null,
      status: null
    },
    corporate: {
      id: null,
      client_id: 1,
      corporate_name: null,
      contact_name: null,
      corporate_phonecode: null,
      corporate_phone: null,
      corporate_telephonecode: null,
      corporate_telephone: null,
      corporate_npwp: null,
      corporate_website: null,
      corporate_description: null,
      commerce_group: null,
      corporate_total_member: null,
      background: null,
      file_pdf: null
    },
    nama: {
      user: null
    }
  },

  getters: {
    getUser (state) {
      return state.user
    },
    getCompany (state) {
      return state.company
    },
    getUsername (state) {
      return state.username
    },
    getCorporate (state) {
      return state.corporate
    },
    getFullname (state) {
      const firstName = state.user.member_first_name
      const middleName = state.user.member_middle_name
      const lastName = state.user.member_last_name

      if (middleName) {
        return `${firstName} ${middleName} ${lastName}`
      }

      return `${firstName} ${lastName}`
    }
  },

  mutations: {
    setUser (state, data) {
      state.user = data
    },
    setCompany (state, data) {
      state.company = data
    },
    setName (state, data) {
      state.nama = data
    },
    setCorporate (state, data) {
      state.corporate = data
    },
    setMainColor (state, data) {
      state.user.main_color = data
    },
    setSecondaryColor (state, data) {
      state.user.secondary_color = data
    },
    setBackground (state, data) {
      state.user.background = data
    }
  },

  actions: {
    submitUser ({ commit }, data) {
      commit('setUser', data)
    },
    submitCompany ({ commit }, data) {
      commit('setCompany', data)
    },
    submitName ({ commit }, data) {
      commit('setName', data)
    },
    submitCorporate ({ commit }, data) {
      commit('setCorporate', data)
    },
    submitMainColor ({ commit }, data) {
      commit('setMainColor', data)
    },
    submitSecondaryColor ({ commit }, data) {
      commit('setSecondaryColor', data)
    },
    submitBackground ({ commit }, data) {
      commit('setBackground', data)
    }
  }
}
