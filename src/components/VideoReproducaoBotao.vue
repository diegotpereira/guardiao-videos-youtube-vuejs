<template>
    <div class="video-rodar-botao">
        <v-img @click="irParaVideo" height="100%" :src="video.image">
            <div class="rodar-botao">
                <v-icon color="#fff">mdi-play</v-icon>
            </div>
        </v-img>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    props: {
        video: {
            type: Object,
            required: true,
        }
    },
    methods: {
        irParaVideo() {
            this.$router.push({
                name: 'player',
                query: {
                    v: this.video.id
                }
            })
        }
    }
}
</script>
<style lang="sass">
.video-rodar-botao 
   cursor: pointer
   height: 200px 
   background-color: #000
   position: relative 
   .v-image__image 
      filter: opacity(0.5)
      .v-responsive__content
         display: flex 
         justify-content: center 
         align-items: center 
.rodar-botao
    with: 40px 
    height: 40px 
    background-color: #FF0000
    border-radius: 50%
    display: flex
    justify-content: center 
    align-items: center
</style>