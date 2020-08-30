<template>
    <div class="container dashboard">
        <div class="row d-flex">
          <div class="col-md-4 box bg_">
            <div class="card text-center ">
                <div class="card-header text-center">Withdrawable</div>
                <div class="card-body">
                  <div class="amount-available mb-3">
                    <b class="available">{{user.for_withdraw}}</b>
                    <b class="available">TRX</b>
                      
                  </div>
                  <button type="button" class="button" @click="withdraw()" data-id="3">Withdraw
                  </button>
                </div>
            </div>
          </div>
          <div class="col-md-8 bg_ text-center">
              <div class="row">
                <div class="col-md-4 ">
                  <blockquote>
                    <span class="text-center">
                      <small>Invested</small>
                        <br>
                        {{user.total_invested}} TRX
                    </span>
                </blockquote>
                </div>
                <div class="col-md-4 ">
                  <blockquote>
                    <span class="text-center">
                      <small>Withdrawn</small>
                        <br>
                        {{user.total_withdrawn}} TRX
                    </span>
                </blockquote>
                </div>
                <div class="col-md-4 ">
                  <blockquote>
                    <span class="text-center">
                      <small>Referral rewards</small>
                        <br>
                        {{user.total_match_bonus}} TRX
                    </span>
                </blockquote>
                </div>
                <div class="col-md-12">
                  <div>
                      <div>
                          <span class="i-text-muted">1 lvl (5% Referral Rewards)</span> 
                          - <span class="i-text-bold">{{user.structure[0]}}</span>
                        </div>
                        <div><span class="i-text-muted">2 lvl (3% Referral Rewards)</span> 
                        - <span class="i-text-bold">{{user.structure[1]}}</span></div>
                        <div><span class="i-text-muted">3 lvl (1% Referral Rewards)</span>
                         - <span class="i-text-bold">{{user.structure[2]}}</span></div>
                         <div><span class="i-text-muted">Invite bonus 1%</span></div></div>

                    
                </div>
              </div>
              
          </div>
        </div>
        <div class="row bg_ text-center mt-2">
            <div class="col-md-6 offset-md-3">
                 <div class="i-text-small i-text-thin i-text-red" v-if="user.total_invested == 0">You will get your ref link after investing</div>
    <div v-if="user.total_invested > 0">
        <div class="ref-link">
            <span> {{ location}}/?ref={{ account }}  </span>

        </div>
        
        <br />
        <span class="button" @click="copyText(location + '/?ref=' + account)">Copy</span>
    </div>
                        
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"SectionDashboard",
    props: {
        user: {
            type: Object
        },
        withdraw: {
            type: Function
        },
        copyText: {
            type: Function
        },
        account: {
            type: String
        }
    },
    data(){
        return {
            location: ""
        }
    },
    mounted: function() {
        this.location = location.origin;
    }
}
</script>