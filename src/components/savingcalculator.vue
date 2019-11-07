<template>
    <div>
        <div class="container mt-5">
            <div class="row text-center">
                <div class="col-12">
                    <h1>
                        โปรดกรอกข้อมูล
                    </h1>
                </div>
            </div>
            <div class="row mt-5">
                <div class="col-12">
                    <div class="form-row">
                        <div class="col">
                            <label for="dato">วันที่ :</label>
                            <input type="date" id="dato" class="form-control" v-model="form.date" placeholder="วันที่">
                        </div>
                        <div class="col">
                            <label for="dato">รายรับ :</label>
                            <input type="number" min="0" max="1000000" id="incoma" class="form-control" v-model="form.income" placeholder="รายรับ">
                        </div>
                        <div class="col">
                            <label for="dato">รายจ่าย :</label>
                            <input type="number" id="raijai" class="form-control" v-model="form.expense" placeholder="รายจ่าย">
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-5">
                <div class="col-12 text-center">
                    <button class="btn btn-success btn-lg" @click="sendForm()">ส่ง</button>
                    <button class="btn btn-primary btn-lg">แสดงรายการ</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            form: {
                date: '',
                income: 0,
                expense: 0
            }
        }
    },
    methods: {
        sendForm () {
            // calculate something

            
            // send to firebase
        }
    }
}
</script>

<style>

h1, label {
    color: white;
    text-shadow: 3px 3px 3px black;
}

#head1 {
    font-size: 80px;
    color: purple;
    text-align: center;
}

#ok {
    font-size: 30px;
    width: 80px;
    height: 40px;
}

#history {
    font-size: 30px;
    width: 100px;
    height: 40px;
}

.name {
    text-align: center;
    font-size: 35px;
    width: 20%;
}

</style>