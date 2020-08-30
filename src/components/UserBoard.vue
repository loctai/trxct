<template>
    <div class="hello">
        <h1>Welcome to regular users page</h1>
        <h2>{{msg}}</h2>
        <h1>USER: {{user.id}}</h1>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                msg: 'The commoners',
                user: this.$store.getters.getUser
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
</style>