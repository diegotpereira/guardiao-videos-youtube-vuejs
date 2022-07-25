<template>
    <v-form @submit.prevent="submit">
        <div class="texto-campo-botao">
            <v-text-field  label="Adicionar" class="texto-campo" v-model="link" outlined/>
            <v-btn type="submit" class="enviar-botao" :loading="carregar" color="var(--primary-color)" height="100%">
                <span>Adicionar</span>
            </v-btn>
        </div>
    </v-form>
</template>
<script>
export default {
    data() {
        return {
            link: ""
        }
    },
    props: {
        carregar: {
            type: Boolean,
            default: false 
        }
    },
    methods: {
        submit() {
            if(!this.link) return;

            this.$emit("submit", this.link)
            this.link = ""
        }
    }
}
</script>
<style lang="sass">
.texto-campo-botao
    height: 57px
.texto-campo 
    width: 75% 
    display: inline-block
    height: 100%
    border-radius: 5px 0px 0px 5px
    border: 1px solid rgba(0, 0, 0, 0.3)
.enviar-botao
    width: 24%
    display: inline-block 
    border-radius: 0px 10px 10px 0px 
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2), 0px 1px 4px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.14)
span 
    color: var(--white-color)
</style>