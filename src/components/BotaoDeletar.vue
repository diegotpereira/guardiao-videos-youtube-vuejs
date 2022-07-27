<template>
    <v-dialog v-model="dialog" persistent max-width="60vw" max-height="20vh">
        <template v-slot:activator="{ on, attrs }">
             <v-btn class="close-button" fab x-small dark v-bind="attrs" v-on="on">
                <v-icon>mdi-close</v-icon>
             </v-btn>
        </template>
        <v-card min-height="257px" height="20vh">
            <h5 class="text-h5">Tem certeza de que deseja excluir este vídeo?</h5>
            <v-card-actions class="action-buttons">
                <v-spacer></v-spacer>
                <v-btn class="cancel-button" text color="var(--primary-color)" @click="fechar">
                    Cancelar
                </v-btn>
                <v-btn class="agree-button" color="var(--primary-color)" @click="confirmarDeletar">
                    Excluir
                </v-btn>
            </v-card-actions>
            <v-btn @click="fechar" class="close-button" fab small text>
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    data() {
        return {
            dialog: false
        }
    },
    methods: {
        fechar() {
            this.dialog = false 
        },
        confirmarDeletar() {
            this.$emit("confirmar-deletar", true)
            this.fechar()
        }
    }
}
</script>