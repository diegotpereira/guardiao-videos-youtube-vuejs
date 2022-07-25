<template>
    <v-skeleton-loader :loading="carregar" width="50vw" type="list-item-two-line">
        <div class="video-galeria">
            <video-item-lista v-for="(video, key) in videos" :key="key" :video="video" @delete="remover" />
        </div>
    </v-skeleton-loader>
</template>
<script>
import VideoItemLista from '../components/VideoItemLista.vue'

export default {
    data() {
        return {
            
        }
    },
    components: {
        VideoItemLista
    },
    props: {
        videos: {
            type: Object,
            required: true,
        },
        carregar: {
            type: Boolean,
            default: false,
        }
    },
    methods: {
        remover(video) {
            this.$emit("remover", video)
        }
    }
}
</script>
<style lang="sass">
.video-galeria 
   display: flex
   flex-wrap: wrap
   justify-content: flex-start
   width: 55
</style>