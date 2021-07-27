<template>
    <header class="header-app">
        <nav>
            <div class="header-app__selector">
                <span
                    v-for="lang in languages"
                    :key="lang"
                    @click="changeLanguage(lang)"
                    :data-test="`button-${lang}`">
                    {{ lang.toUpperCase() }}
                </span>
            </div>
        </nav>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HeaderApp',
  setup() {
      return {
          languages: ['es', 'en']
      }
  },
  methods: {
    changeLanguage (lang: string) {
      localStorage.setItem('languageShoppingCart', lang)
      this.$i18n.locale = lang
    }
  }
})
</script>

<style scoped lang="scss">
    .header-app {
        display: block;
        padding: 1rem 0;
        color: var(--secondary-color);

        nav {
            position: relative;
            margin: 0 auto;
            padding: 0;
            max-width: 1088px;
            width: calc(100% - 64px);
            display: flex;
            justify-content: space-between;

        }

        &__selector {
            line-height: 32px;

            > span {
                cursor: pointer;
                margin-right: 1rem;

                &:hover{
                    text-decoration: underline;
                }
            }
        }
    }
</style>
