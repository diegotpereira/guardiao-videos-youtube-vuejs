<template>
    <div class="layout">
        <link-adicionador @new-video="addVideo" @error="handleError" />
        <video-galeria :videos="videos" :loading="loading" @remove="removerVideo" />

        <v-snackbar :color="snackbar.type" v-model="snackbar.show">
            {{ snackbar.message }}
        <template v-slot:action="{ attrs }">
            <v-btn text v-bind="attrs" @click="snackbar.show = false">
                fechar
            </v-btn>
        </template>
        </v-snackbar>
    </div>
</template>
<script>
import LinkAdicionador from '../components/LinkAdicionador.vue'
import VideoGaleria from '../components/VideoGaleria.vue'
import API from '@/servicos/lambda.api'

export default {
    name: 'HomePagina',
    data() {
        return {
            snackbar: {
                show: false,
                message: "",
                type: "success"
            },
            videos: {},
            loading: false
        }
    },
    components: {
        LinkAdicionador,
        VideoGaleria
    },
    methods: {
        addVideo(videoInfo) {
            if (!videoInfo) {
                this.exibirSnackbar('Sentimos muito, este video no existe')
                return
            }
            const video = {
                id: videoInfo.id,
                title: videoInfo.snippet.title,
                image: videoInfo.snippet.thumbnails.high.url,
                url: `https://youtube.com/watch?v=${videoInfo.id}`,
                description: videoInfo.snippet.description,
            }
            if (this.videos[videoInfo.id]) {
                this.exibirSnackbar(
                    'Este vídeo já está na biblioteca',
                    'info'
                )
                return
            }
            API.addVideo(video)
            .then(() => {
                this.$set(this.videos, videoInfo.id, video)
                this.exibirSnackbar("O vídeo foi adicionado")
            })
            .catch((err) => {
                this.handleError('Ocorreu um erro inesperado')
                console.log(err);
            })
        },
        handleError(errorMessage) {
            this.exibirSnackbar (errorMessage, "error")
        },
        removerVideo(video) {
            API.deleteVideo(video.id)
               .then(() => {
                this.exibirSnackbar('video removido')
                this.$delete(this.videos, video.id)
               })
               .catch((err) => {
                this.handleError('Ocorreu um erro inesperado')
                console.log(err);
               })
        },
        exibirSnackbar(message, type = "success") {
            this.snackbar.message = message
            this.snackbar.type = type
            this.snackbar.show = true
        }
    },
    mounted() {
        this.loading = true 
        API.getVideos()
            .then((response) => {
                response.Items.forEach((video) => {
                    this.$set(this.videos, video.id, video)
                })
            })
            .finally(() => {
                this.loading = false
            })
    }
}
</script>