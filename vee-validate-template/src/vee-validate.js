import Vue from 'vue'
import { localize, ValidationProvider, extend, ValidationObserver } from 'vee-validate'
import { required, min, max } from 'vee-validate/dist/rules'
import en from 'vee-validate/dist/locale/pt_BR.json'
import store from './store/store.js'

// Add the required rule
extend('required', required)

extend('min', min)

extend('max', max)

extend('personName', {
  validate: function (value) {
    var re = new RegExp(store.getters.validation.personName)
    return re.test(value)
  },
  message: 'Nome inválido. Deve conter nome e sobrenome.'
})

extend('cpfValid', {
  validate: function (value) {
    let cpf
    cpf = value.replace(/[^\d]+/g, '')

    var numeros, digitos, soma, i, resultado, digitosIguais
    digitosIguais = 1

    if (cpf.length < 11) return false

    for (i = 0; i < cpf.length - 1; i++) {
      if (Number(cpf.charAt(i)) !== Number(cpf.charAt(i + 1))) {
        digitosIguais = 0
        break
      }
    }

    if (!digitosIguais) {
      numeros = cpf.substring(0, 9)
      digitos = cpf.substring(9)
      soma = 0

      for (i = 10; i > 1; i--) {
        soma += numeros.charAt(10 - i) * i
      }

      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11

      if (resultado !== Number(digitos.charAt(0))) return false

      numeros = cpf.substring(0, 10)
      soma = 0

      for (i = 11; i > 1; i--) {
        soma += numeros.charAt(11 - i) * i
      }

      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
      if (resultado !== Number(digitos.charAt(1))) return false

      return true
    } else {
      return false
    }
  },
  message: 'Cpf Inválido'
})

localize({
  en
})

// Register it globally
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
