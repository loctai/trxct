<template>
    <div class="container contract-status">
        <div class="text-center mt30">
          
          <div class="row">
              <div class="col-md-10 offset-md-1">
                  <img src="/images/pr2v-01-300x300.png" />
              </div>

          </div>
          <div class="row">
              <div class="col-md-10 offset-md-1">
                  <h1>26% - 35% daily ROI <br />
<small>10% 4-tier Referral Rewards</small></h1>
              </div>                    
          </div>
          <ul class="head-navigation text-center">
            <li class="main-nav text-left">
                <a href="#0" data-scroll-nav="1" class="">
                    <h4>Total TRX Invest</h4>
                    <div class="top-nav">
                        <span>
                            <i class="arrow"></i>
                            {{contract.invested}} TRX
                            <i class="arrow"></i>		
                        </span>
                    </div>
                    
                </a>                        
            </li>
            <li class="main-nav text-left">
                <a href="#0" data-scroll-nav="2" class="">
                <h4>Total TRX Referral</h4>
                <div class="top-nav">
                    <span>
                        <i class="arrow"></i>
                        {{contract.match_bonus}} TRX
                        <i class="arrow"></i>		
                    </span>
                </div>
                 </a>
            </li>
        </ul>
        <div class="text-center">
          <a :href='"https://shasta.tronscan.org/#/address/"+contract_address+""' target="_blank" class="button scrolly"> Verified Contract (Tronscan) </a>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"SectionContract",
    props: {
        contract: {
            type: Object
        },
        contract_address: {
            type: String
        }
    },
}
</script>