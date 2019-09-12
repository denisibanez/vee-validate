<template>
  <div  class="container-fluid content-holder">
    <div class="row">
      <div class="col-12">
        <figure class="stelo-logo">
      <img src="../assets/logo.png" />
    </figure>
      </div>
    </div>

    <div class="row justify-content-center">
      <h1>Vue Template Vee Validate</h1>
    </div>

    <div class="row justify-content-center">
      <div class="col-4 container-login">
        <ValidationObserver v-slot="{ valid }" tag="form" ref="observer" @submit.prevent="submit()">
          <div class="row justify-content-start flex-wrap-collum">
            <div class="col-12">
              <label for="input-small">Nome completo:</label>
              <ValidationProvider rules="required|min:3|max:60|personName" v-slot="{errors, valid, touched}" name="nome" >
                <b-form-input :state="(login.name.length ? valid : null) || (touched ? valid : null)" v-model="login.name" placeholder="Escreva seu nome"></b-form-input>
                <span v-if="touched" class="error">{{ errors[0]}}</span>

              </ValidationProvider>
            </div>
          </div>

          <div class="row justify-content-start flex-wrap-collum">
           <div class="col-12">
              <label for="input-small">Cpf:</label>
              <ValidationProvider rules="required|cpfValid" v-slot="{errors, valid, touched}"  class="col-12" name="cpf">
                <b-form-input v-mask="'###.###.###-##'" :state="(login.cpf.length ? valid : null) || (touched ? valid : null)" v-model="login.cpf" placeholder="Escreva seu Cpf"></b-form-input>
                <span v-if="touched" class="error">{{ errors[0]}}</span>
              </ValidationProvider>
           </div>
          </div>

          <div class="row justify-content-end">
            <div class="col-6">
              <b-form-checkbox  v-model="login.checkRemember" @change="onChangeCheckRemember()">Lembrar-me</b-form-checkbox>
            </div>
            <div  class="col-6">
              <button :disabled="!valid">Submit</button>
            </div>
          </div>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',

  data () {
    return {
      login: {
        name: String(),
        cpf: String(),
        ip: String(),
        checkRemember: false
      }
    }
  },

  created () {
    this.checkLoginStored()
    this.getIpFunction()
  },

  methods: {
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (isValid) {
        localStorage.setItem('loginCredenciamentoAdmin', JSON.stringify(this.login))
        this.$router.push({ path: '' })
      }
    },

    getIpFunction () {
      let _self = this
      function getIp (callback) {
        function response (s) {
          callback(window.userip)
          s.onload = s.onerror = null
          document.body.removeChild(s)
        }

        function trigger () {
          window.userip = false
          var s = document.createElement('script')
          s.async = true
          s.onload = function () {
            response(s)
          }
          s.onerror = function () {
            response(s)
          }
          s.src = 'https://l2.io/ip.js?var=userip'
          document.body.appendChild(s)
        }

        if (/^(interactive|complete)$/i.test(document.readyState)) {
          trigger()
        } else {
          document.addEventListener('DOMContentLoaded', trigger)
        }
      }

      getIp(function (ip) {
        _self.login.ip = ip
      })
    },

    checkLoginStored () {
      let storedData = localStorage.loginCredenciamentoAdmin ? JSON.parse(localStorage.loginCredenciamentoAdmin) : undefined
      if (storedData) {
        this.login.checkRemember = storedData.checkRemember
        this.login.name = storedData.name
        this.login.cpf = storedData.cpf
      }
    },

    onChangeCheckRemember () {
      if (this.login.checkRemember) localStorage.removeItem('loginCredenciamentoAdmin')
      else localStorage.setItem('loginCredenciamentoAdmin', JSON.stringify(this.login))
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/styles/mixins";

  .content-holder {
    @include stelo-bg-gradient;
    .stelo-logo {
      margin: 40px 0 20px;
      display: flex;
      justify-content: flex-start;
      padding-left: 50px;
    }

    .container-login {
      background-color: white;
      padding: 50px;
      border-radius:5px;
    }
  }
</style>
