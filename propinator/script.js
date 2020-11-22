new Vue({
  el: '#app',
  data () {
    return {
      cuenta: 2500
    }
  },
  computed: {
    propina() {
      return Math.round(this.cuenta * 0.1)
    }
  }
})