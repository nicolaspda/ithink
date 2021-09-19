<template>
   <v-container id="sticky">
          <v-speed-dial
            v-model="fab"
            absolute
            bottom
            right
            direction="top"
            :open-on-hover="false"
            transition="slide-y-reverse-transition"
          >
            <template v-slot:activator>
              <v-btn v-model="fab" color="#263238" dark fab>
                <v-icon v-if="fab">mdi-close</v-icon>
                <v-icon v-else>mdi-account-circle</v-icon>
              </v-btn>
            </template>
            <v-btn fab dark small color="green">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn fab dark small color="indigo">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn fab dark small color="red">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-speed-dial>
  </v-container>
</template>

<style scoped>

#sticky{     
     position:sticky; 
     bottom:0; 
}
</style>

<script>
export default {
  name: "HelloWorld",
  data: () => ({
    fab: false,
  }),
};
</script>