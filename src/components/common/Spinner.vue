<template>
  <div class="spinner">
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Spinner'
})
</script>

<style scoped lang="scss">
  .spinner {
    height: 90vh;
    display: flex;
    align-items: center;
  }

  // Get Spinner of: https://loading.io/css/
  .lds-ring {
    display: inline-block;
    position: relative;
    width: rem(80);
    height: rem(80);
    margin: 0 auto rem(90);
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: rem(64);
    height: rem(64);
    margin: rem(8);
    border: rem(6) solid var(--secondary-color);
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: var(--secondary-color) transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
