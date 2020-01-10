export default {
  name: 'InstagramFeed',
  computed: {
    feed () {
      return this.$store.getters['instagram-feed/media']
    }
  },
  beforeMount () {
    this.$store.dispatch('instagram-feed/get')
  }
}
