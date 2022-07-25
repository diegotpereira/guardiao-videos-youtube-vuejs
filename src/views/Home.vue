<template>
    <div class="layout">
        <link-adicionador @new-video="addVideo" @error="handleError" />
        <video-galeria :videos="videos" :loading="carregar" @remove="removerVideo" />

        <v-snackbar :color="snackbar.type" v-model="snackbar.show">
            {{ snackbar.messagem }}
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
                mensagem: "",
                type: "success"
            },
            videos: {},
            carregar: false
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
                titulo: videoInfo.snippet.titulo,
                imagem: videoInfo.snippet.thumbnails.high.url,
                url: `https://youtube.com/watch?v=${videoInfo.id}`,
                descricao: videoInfo.snippet.descricao
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
                console.log(err);
            })
        },
        handleError(errorMessage) {
            this.exibirSnackbar (errorMessage, "error")
        },
        removerVideo(video) {
            console.log(video);
        },
        exibirSnackbar(mensagem, type = "success") {
            this.snackbar.mensagem = mensagem
            this.snackbar.type = type
            this.snackbar.show = true
        }
    },
    mounted() {
        this.carregar = true 
        API.getVideos()
            .then((response) => {
                response.Items.forEach((video) => {
                    this.$set(this.videos, video.id, video)
                })
            })
            .finally(() => {
                this.carregar = false
            })
    }
}
</script>