<template>
    <div class="alert" :class="classes" role="alert">
        <slot></slot>
        <button v-if="fermable" type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
</template>

<script>
export default {
    name: 'Message',
    data(){
        return {

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
    watch: {
        
    },
}
</script>

<style>

</style>