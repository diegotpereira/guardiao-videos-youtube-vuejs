<template>
    <v-dialog v-model="dialog" max-width="60vw" max-height="20vh">
        <template v-slot:activator="{ on, attrs }">
            <div class="video-item-list" v-bind="attrs" v-on="on">
                <v-img height="100%" :src="video.image" />
                
            </div>
        </template>
        <v-card min-height="60vh" height="60vh">
            <div class="video-preview">
                <div class="video-img">
                    <video-reproducao-botao :video="video" />
                </div>
                <div class="video-description">
                    <h5> {{ video.title }}</h5>
                    <pre>{{ video.description }}</pre>
                </div>
            </div>
            <v-btn @click="fechar" class="close-button" fab small text>
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card>
    </v-dialog>
</template>
<script>
import VideoReproducaoBotao from './VideoReproducaoBotao.vue'

export default {
    data() {
        return {
            dialog: false
        }
    },
    props: {
        video: {
            type: Object,
            required: true 
        }
    },
    components: {
        VideoReproducaoBotao
    },
    methods: {
        fechar() {
            this.dialog = false
        }
    }
}
</script>