<template>

<v-row style="max-width: 200px">
                <v-slider
                  v-model="total"
                  thumb-label="always"
                  thumb-size="24"
                  :thumb-color="colorTip"
                  :track-color="colorAfter"
                  color="#81C784"
                  readonly
                ></v-slider>
</v-row>

</template>

<script>
export default {
  data() {
    return {
      /*Slider*/
      colorTip: '#424242',
      colorAfter: '#E57373',
      total: 90,
      showSlider: true,
    }
  },
}
</script>

<style></style>
