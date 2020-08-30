<template>
    <!-- Intro -->
    <section id="intro" class="wrapper style1 fullscreen fade-up">
        <div class="inner">
            <h1>Hyperspace</h1>
            <p>Just another fine responsive site template designed by <a href="http://html5up.net">HTML5 UP</a><br />
            and released for free under the <a href="http://html5up.net/license">Creative Commons</a>.</p>
            <ul class="actions">
                <li><a :href="'https://shasta.tronscan.org/#/address/' + contract_address" class="button scrolly" target="_blank"> Contract </a></li>
            </ul>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'Intro',
        props: {
            contract_address: {
                type: String
            }
        },
        data () {
            return {
                msg: 'footer'
            }
        }
    }
</script>