export default {
  name: 'InstagramFeed',
  computed: {
    feed () {
      console.log(this.$store.getters['instagram-feed/media'])
      return this.$store.getters['instagram-feed/media']
    }
  },
  beforeMount () {
    this.$store.dispatch('instagram-feed/get')
  }
}
