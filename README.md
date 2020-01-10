#### This module needs mod_m2vsf_apiquery and mageplaza/module-instagram-feed 
##### First go in mageplaza backend and create the token

##### Copy instagram directory in vue-storefront/src/modules and register the module

##### Copy instagram-api directory in vue-storefront-api/src/api/extensions 

##### Put the InstagramFeed.vue component wherever you want in your custom theme

##### To import InstagramFeed.vue add this section 

```vue
<section class="container pb60 px15">
  <div class="row center-xs">
    <header class="col-md-12 pt40">
      <h2 class="align-center cl-accent">
        {{ $t('Instagram') }}
      </h2>
    </header>
  </div>
  <instagram-feed/>
</section>
```

##### In config/local.json (vue-storefront) add 
```json
"instagram": {
    "endpoint": "http://hardy.localdev.triboo.local:8080/api/ext/instagram-api/instagramFeed",
    "limit": 8
  }
```

##### In config/local.json (vue-storefront-api) add "instagram-api" to registeredExtensions
