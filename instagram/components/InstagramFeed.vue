<template>
  <div class="row center-xs">
    <div
      class="col-sm-3 pb15"
      v-for="(media, index) in feed"
      v-if="index <= limit"
      :key="media.id"
    >
      <div
        class="tile center-xs middle-xs"
      >
        <img
          class="tile-image"
          v-lazy="media.images.standard_resolution.url"
          :alt="media.caption.text"
          height="150px"
          width="150px"
        >
      </div>
    </div>
  </div>
</template>

<script>
import InstagramFeed from 'src/modules/instagram/components/InstagramFeed'
import config from 'config'
export default {
  name: 'InstagramFeed',
  mixins: [InstagramFeed],
  data () {
    return {
      limit: config.instagram.limit - 1
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "~theme/css/animations/transitions";
    .tile {
        display: flex;
        overflow: hidden;
    }
    .tile-image {
        width: 100%;
        height: 100%;
        transition: transform 0.3s $motion-main;
        &:hover,
        &:focus {
            transform: scale(1.2);
        }
    }
</style>
