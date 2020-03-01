<template>
    <div class="alert" :class="classes">
        <slot v-html="contenuHtml"></slot>
        <button v-if="fermable" type="button" class="close" aria-label="Close" @click="closeAlert">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
</template>

<script>
export default {
    name: 'Message',
    data(){
        return {
            contenuHtml: "Lol"
        }
    },
    props: {
        type: {
            type: String,
            default: "dark"
        },
        fermable: Boolean
    },
    computed: {
        messageType(){
            return "alert-" + this.type;
        },
        classes(){
            var classes = [this.messageType]
            if(this.fermable)
                classes.push('alert-dismissible fade show')
            return classes
        }
    },
    methods: {
        closeAlert(){
            this.$emit("close");
        }
    },
}
</script>

<style>

</style>