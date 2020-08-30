<template>
    <div class="container plan">
      <div class="row">
        <div class="col-md-3 col-sm-6">
            <div class="card mb-3">
                <div class="card-header text-center">Bronze</div>
                <div class="card-body text-center">
                    <h5 class="card-title">17% / day</h5>
                    <div><i class="cil-check-circle text-warning" style="font-size:12px"></i> <b>7 days</b>
                    </div>
                    <div><i class="cil-check-circle text-warning" style="font-size:12px"></i> Return
                        <b>119%</b></div>

                    <div class="input-group mb-3" style="margin-top:15px">
                        <input type="number" 
                        v-model.lazy="amount"
                        class="form-control amount-0 planInput" placeholder="Min. 50 TRX">
                        <div class="input-group-append">
                            <span class="input-group-text">TRX</span>
                        </div>

                        <small>You should have ~3 TRX more for the transaction fee</small>
                    </div>

                    <button type="button" @click="deposit(0, amount)" class="button" data-id="0">
                        Invest
                    </button>
                </div>
            </div>
        </div>
        <div class="col-md-3 col-sm-6">
            <div class="card card-accent-info mb-3">
                <div class="card-header text-center">Silver</div>
                <div class="card-body text-center">
                    <h5 class="card-title">32% / day</h5>
                    <div><i class="cil-check-circle text-warning" style="font-size:12px"></i> <b>6 days</b>
                    </div>
                    <div><i class="cil-check-circle text-warning" style="font-size:12px"></i> Return
                        <b>192%</b></div>

                    <div class="input-group mb-3" style="margin-top:15px">
                        <input type="number" v-model.lazy="amount" class="form-control amount-1 planInput" placeholder="Min. 50 TRX">
                        <div class="input-group-append">
                            <span class="input-group-text">TRX</span>
                        </div>

                        <small>You should have ~3 TRX more for the transaction fee</small>
                    </div>

                    <button type="button" @click="deposit(1, amount)" class="button" data-id="1">Invest
                    </button>
                </div>
            </div>
        </div>
        <div class="col-md-3 col-sm-6">
          <div class="card card-accent-success mb-3">
              <div class="card-header text-center">Gold</div>
              <div class="card-body text-center">
                  <h5 class="card-title">12% / day</h5>
                  <div><i class="cil-check-circle text-warning" style="font-size:12px"></i> <b>12 days</b>
                  </div>
                  <div><i class="cil-check-circle text-warning" style="font-size:12px"></i> Return
                      <b>144%</b></div>

                  <div class="input-group mb-3" style="margin-top:15px">
                      <input type="number" v-model.lazy="amount" class="form-control amount-2 planInput" placeholder="Min. 50 TRX">
                      <div class="input-group-append">
                          <span class="input-group-text">TRX</span>
                      </div>

                      <small>You should have ~3 TRX more for the transaction fee</small>
                  </div>

                  <button type="button" @click="deposit(2, amount)" class="button" data-id="2">
                      Invest
                  </button>
              </div>
          </div>
      </div>
      <div class="col-md-3 col-sm-6">
        <div class="card card-accent-warning mb-3">
            <div class="card-header text-center">Diamond</div>
            <div class="card-body text-center">
                <h5 class="card-title">26% / day</h5>
                <div><i class="cil-check-circle text-warning" style="font-size:12px"></i> <b>10 days</b>
                </div>
                <div><i class="cil-check-circle text-warning" style="font-size:12px"></i> Return
                    <b>260%</b></div>

                <div class="input-group mb-3" style="margin-top:15px">
                    <input type="number" v-model.lazy="amount" class="form-control amount-3 planInput" placeholder="Min. 50 TRX">
                    <div class="input-group-append">
                        <span class="input-group-text">TRX</span>
                    </div>

                    <small>You should have ~3 TRX more for the transaction fee</small>
                </div>

                <button type="button" @click="deposit(3, amount)" class="button" data-id="3">Invest
                </button>
            </div>
        </div>
    </div>

      </div>
    </div>
</template>

<script>
export default {
    name:"SectionPlan",
    props: {
        deposit: {
            type: Function
        }
    },
    data(){
        return {
            amount: ''
        }
    },
}
</script>