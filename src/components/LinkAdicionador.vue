<template>
    <div class="link-adicionador">
        <h2>Adicionar novo vídeo</h2>
        <texto-campo-botao :loading="carregar" @submit="verificarLink" />
    </div>
</template>
<script>
import TextoCampoBotao from '../components/TextoCampoBotao.vue'
import YoutubeLinkHandler from '@/utils/youtubeLinkHandler'
import Youtube from '@/servicos/youtube.api'

export default {
    name: 'LinkAdicionador',
    data() {
        return {
            carregar: false
        }
    },
    components: {
        TextoCampoBotao
    },
    methods: {
        verificarLink(link) {
            const videoIdentificador = YoutubeLinkHandler.getVideoIdentificador(link)

            if (!videoIdentificador) {
                this.$emit("error", "Você só pode inserir links para vídeos válidos do YouTube")

                return
            }
            this.carregar = true

            Youtube.getVideoInformacao(videoIdentificador)
            .then((videoInfo) => this.$emit("new-video", videoInfo))
            .finally(() => {
                this.carregar = false
            })
        }
    }
}
</script>
<style lang="sass">
.link-adicionador
    width: 62vw
h2
    font-size: 28px
    font-weight: 500
    margin-bottom: 10px
</style>