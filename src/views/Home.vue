<template>
  <div>
        <!-- <h1>{{balance()}}</h1> -->
        <section-contract :contract="contract" :contract_address="contract_address" />
        <section-plan :deposit="deposit" />
        <section-dashboard  :account="account" :copyText ="copyText" :user="user" :withdraw="withdraw" />
  </div>
</template>

<script>
import SectionContract from "@/components/Home/SectionContract";
import SectionPlan from "@/components/Home/SectionPlan";
import SectionDashboard from "@/components/Home/SectionDashboard";
import util from "@/util/util"
export default {
    name: "home",
    components: {
            SectionContract,
            SectionDashboard,
            SectionPlan
    },
    data () {
        return {
            account: "",
            upline: 'TCatQUXQ78oc619fcjyw25Ftxtsr6P3fNu', // TY1EipSpqybhSWUkSTfJhEJFzBadHhUf5f - Zero address
            contract_address: 'THjEe1xjcRkVX5XYUUEdVQdTfYFnMfbarC',
            contract: {
                invested: 0,
                withdraw: 0,
                direct_bonus: 0,
                match_bonus: 0
            },
            user: {
                trx: 0,
                for_withdraw: 0,
                total_invested: 0,
                total_withdrawn: 0,
                total_match_bonus: 0,
                structure: [0,0,0]
            },
            tarifs: [
                {days: 7, percent: 119},
                {days: 8, percent: 124},
                {days: 9, percent: 129},
                {days: 10, percent: 134},
                {days: 11, percent: 139},
                {days: 12, percent: 144},
                {days: 13, percent: 149},
                {days: 14, percent: 154},
                {days: 15, percent: 159},
                {days: 16, percent: 164},
                {days: 17, percent: 169},
                {days: 18, percent: 174},
                {days: 19, percent: 179},
                {days: 20, percent: 184},
                {days: 21, percent: 189},
                {days: 22, percent: 194},
                {days: 23, percent: 199},
                {days: 24, percent: 204},
                {days: 25, percent: 209},
                {days: 26, percent: 214},
                {days: 27, percent: 219},
                {days: 28, percent: 224},
                {days: 29, percent: 229},
                {days: 30, percent: 234}
            ],
            calc: {
                tarif: 0,
                amount: 50
            },
            events: []
		}
    },
    mounted() {
        
            console.log(location.origin);
        let m = location.search.match(/ref=(T[1-9A-HJ-NP-Za-km-z]{33})/i);
        if(m) {
            this.upline = m[1];
            document.cookie = "upline=" + this.upline + "; path=/; expires=" + (new Date(new Date().getTime() + 86400 * 365 * 1000)).toUTCString();
        }

        m = document.cookie.match(/upline=(T[1-9A-HJ-NP-Za-km-z]{33})/i);
        if(m) this.upline = m[1];

        if(!document.cookie.match(/coopolice=1/)) {
            util.notice('This website uses cookies, for functionality purposes, please click here to continue.', '007eff', 0).then(() => (document.cookie = 'coopolice=1; Max-Age=31536000; path=/'));
        }
        this.getEventsList();
        setInterval(() => {
            this.getContractInfo();
            this.getUserInfo();
            this.updateUserInfo();
        }, 3000);
    },
    methods: {
        balance() {
            return this.$store.state.tron.tronData.balance
        },
        getContractInfo() {
            if(this.$store.state.tron.tronData.contract) {
                let contract = this.$store.state.tron.tronData.contract;
                let tronWeb = this.$store.state.tron.tronData.tronWebInstance;
                contract.contractInfo().call().then(res => {
                    this.contract.invested = parseFloat(tronWeb.fromSun(res._invested));
                    this.contract.withdraw = parseFloat(tronWeb.fromSun(res._withdrawn));
                    this.contract.direct_bonus = parseFloat(tronWeb.fromSun(res._direct_bonus));
                    this.contract.match_bonus = parseFloat(tronWeb.fromSun(res._match_bonus));
                });
            }
        },
        getUserInfo() {
            if(this.$store.state.tron.tronData.contract) {
                let contract = this.$store.state.tron.tronData.contract;
                let tronWeb = this.$store.state.tron.tronData.tronWebInstance;
                this.account= this.$store.state.tron.tronData.coinbase;
                contract.userInfo(this.$store.state.tron.tronData.coinbase).call().then(res => {
                    this.user.for_withdraw = parseFloat(tronWeb.fromSun(res.for_withdraw));
                    this.user.total_invested = parseFloat(tronWeb.fromSun(res.total_invested));
                    this.user.total_withdrawn = parseFloat(tronWeb.fromSun(res.total_withdrawn));
                    this.user.total_match_bonus = parseFloat(tronWeb.fromSun(res.total_match_bonus));
                    this.user.structure = res.structure;
                    
                });
            }
        },
        updateUserInfo(){
            this.$http.post("/api/updateTron", {
                        address: this.account,
                        total_invested: this.user.total_invested,
                        total_withdrawn: this.user.total_withdrawn
                    }).then(res => {        
                        return;
                    }).catch(function(error) {
                        console.error(error.response);
                    });
        },
        getEventsList() {
            fetch('https://api.shasta.trongrid.io/v1/contracts/' + this.contract_address + '/events?event_name=&only_confirmed=true&order_by=block_timestamp%2Cdesc').then(r => r.json()).then(res => {
                res.data.forEach(v => {
                    this.events.push({
                        time: v.block_timestamp,
                        type: v.event_name,
                        amount: (v.result.amount / 1e6) || 0,
                        tx: v.transaction_id
                    });
                });
                // console.log(this.events);
            });
        },
        withdraw() {
            if(this.$store.state.tron.tronData.contract) {
                util.notice('Confirm transaction', 'fb8c00');
                let contract = this.$store.state.tron.tronData.contract;
                contract.withdraw().send({shouldPollResponse: true}).then(res => {
                    util.notice('Transaction successful', '4caf50');
                    this.getUserInfo();
                });
            };
        },
        deposit(tarif, amount) {
            amount = parseFloat(amount) || 0;
            if(amount >= 50) {
                if(this.$store.state.tron.tronData.contract) {
                    let tronWeb = this.$store.state.tron.tronData.tronWebInstance;
                    let contract = this.$store.state.tron.tronData.contract;
                    util.notice('Confirm transaction', 'fb8c00');
                    contract.deposit(tarif, this.upline).send({
                        callValue: tronWeb.toSun(amount),
                        shouldPollResponse: true
                    }).then(res => {
                        util.notice('Transaction successful', '4caf50');
                        this.getUserInfo();
                    });
                };
            }
        },
        copyText(value) {
                let s = document.createElement('input');
                s.value = value;
                document.body.appendChild(s);

                if(navigator.userAgent.match(/ipad|ipod|iphone/i)) {
                    s.contentEditable = true;
                    s.readOnly = false;
                    let range = document.createRange();
                    range.selectNodeContents(s);
                    let sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                    s.setSelectionRange(0, 999999);
                }
                else s.select();

                try { document.execCommand('copy'); util.notice('Link copied to clipboard', '4caf50'); }
                catch (err) { }

                s.remove();
            },
    }
  
};
</script>

<style>
.button {
  background-color: #999999;
  padding: 1rem;
  border-radius: 0.5rem;
  color: #ffffff;
  text-decoration: none;
}
</style>
