<template>
    <div>
        <div class="container mt-5 mb-5">
            <div class="row text-center">
                <div class="col col-sm-12 col-md-12">
                    <h1>
                        คำนวณรายรับรายจ่าย #{{this.username}}
                    </h1>
                </div>
            </div>

            <form v-on:submit.prevent="sendForm()"> <!-- เรียกใช้ method sendForm()-->
            <!-- ฟอร์มของวันที่ รายรับ และรายจ่าย -->
            <div class="row mt-5">
                <div class="col col-sm-12 col-md-12">
                    <div class="form-row">
                        <div class="col-4 col-4 col-md-4 col-sm-4">
                            <label for="dato">วันที่ :</label>
                            <input type="date" id="dato" class="form-control" v-model="form.date" placeholder="วันที่" required>
                        </div>
                        <div class="col-4 col-4 col-md-4 col-sm-4">
                            <label for="incoma">รายรับ (บาท) :</label>
                            <input type="number" min="0" max="1000000" id="incoma" class="form-control" v-model="form.income" placeholder="รายรับ" required>
                        </div>
                        <div class="col-4 col-4 col-md-4 col-sm-4">
                            <label for="raijai">รายจ่าย (บาท) :</label>
                            <input type="number" id="raijai" class="form-control" v-model="form.expense" placeholder="รายจ่าย" required>
                        </div>
                    </div>
                </div>
            </div>


            <!-- ส่วนของฟีเจอร์ คำนวณจำนวนวันที่จะซื้อของได้ -->
            <div class="row mt-5">
                <div class="col col-sm-12 col-md-12 mt-5">
                   <h1 class="text-center">
                       คำนวณจำนวนวันที่จะซื้อของได้
                   </h1>
                    <div class="form-row">
                        <div class="col col-md-12 col-sm-12">
                            <label for="goalla">ราคาของที่เราอยากได้ (บาท) :</label>
                            <input type="number" id="goalla" class="form-control" v-model="goal" placeholder="เป้าหมายที่ต้องการ">
                        </div>
                    </div>
                    <!-- เงื่อนไขการแสดงผลข้อมูลที่คำนวณแล้ว -->
                    <div v-if="this.goal == 0">
                        <h2 class="text-center mt-3 mb-2">
                        กรอกราคา เพื่อคำนวณ !
                        </h2>
                    </div>
                    <div v-else-if="this.totalBalance <= 0">
                        <h2 class="text-center mt-3 mb-2">
                            พยายามลดรายจ่ายนะ คุณไม่มีเงินเก็บเลย ;(
                        </h2>
                    </div>
                    <div v-else-if="this.daysLeft >= 1">
                        <h2 class="text-center mt-3 mb-2">
                        ประมาณ {{daysLeft}} วันเงินจะพอ สู้เขานะ !
                        </h2>
                    </div>
                    <div v-else>
                        <h2 class="text-center mt-3 mb-2">
                        เงินพอแล้ว.. ซื้อของได้เลยย !
                        </h2>
                    </div>
                </div>
            </div>
            
            <!-- สร้างปุ่ม ส่ง ล้างรายการ และ ออกจากระบบ -->
            <div class="row mt-5 mb-5">
                <div class="col col-sm-12 col-md-12 text-center">
                    <button type="submit" class="btn btn-success btn-lg">ส่ง</button>
                    <button type="button" class="btn btn-primary btn-lg" @click="removeAllRows()">ล้างรายการ</button>
                    <button type="button" class="btn btn-danger btn-lg" @click="$router.push({name: 'SavingCalculatorLogin'})">ออกจากระบบ</button>
                </div>
            </div>

            <!-- แสดงรายการข้อมูลที่ผ่านการคำนวณ -->
            <div class="row bg-dark text-center mt-5">
                <div class="col-3 col-sm-3">
                    <label for="dato">รายได้รวม</label>
                </div>
                <div class="col-3 col-sm-3">
                    <label for="dato">รายจ่ายรวม</label>
                </div>
                <div class="col-3 col-sm-3">
                    <label for="dato">คงเหลือทั้งหมด</label>
                </div>
                <div class="col-3 col-sm-3">
                    <label for="dato">เงินเก็บเฉลี่ยต่อวัน</label>
                </div>
            </div>

            <!-- เงื่อนไขถ้าไม่มีข้อมูลให้ขึ้นว่าไม่มีรายการให้แสดง -->
            <div v-if="this.transactionList.length">
                <div class="row bg-light text-center pt-2 pb-2 mb-5">
                    <div class="col-3 col-sm-3">
                        {{incomeSum}} บาท   
                    </div>
                    <div class="col-3 col-sm-3">
                        {{expenseSum}} บาท  
                    </div>
                    <div class="col-3 col-sm-3">
                        {{totalBalance}} บาท    
                    </div>
                    <div class="col-3 col-sm-3">
                        {{balanceAvg}} บาท
                    </div>
                </div>
            </div>
            <div v-else class="row pb-2 pt-2 border-dark bg-light text-center mb-5"> 
                <div class="col col-md-12 col-sm-12">
                    ไม่มีรายการให้แสดง
                </div>
            </div>
            
            <!-- แสดงตารางข้อมูลดิบ -->
            <div class="row bg-dark text-center">
                <div class="col-3 col-md-3 col-sm-3">
                    <label for="dato">วันที่ </label>
                </div>
                <div class="col-2 col-md-2 col-sm-2">
                    <label for="dato">รายรับ </label>
                </div>
                <div class="col-2 col-md-2 col-sm-2">
                    <label for="dato">รายจ่าย </label>
                </div>
                <div class="col-3 col-md-3 col-sm-3">
                    <label for="dato">คงเหลือ</label>
                </div>
                <div class="col-2 col-md-2 col-sm-2">
                    <label for="dato">ลบ</label>
                </div>
            </div>

            <!-- ถ้าไม่มีให้ขึ้นว่า ไม่มีรายการให้แสดง -->
            <div v-if="this.transactionList.length">
                <div v-for="row in transactionList">
                    <div class="row pb-2 pt-2 border-bottom border-dark bg-light" style="text-align:center">
                        <div class="col-3 col-md-3 col-sm-3">{{row.data.tranData.date}}</div>
                        <div class="col-2 col-md-2 col-sm-2">{{row.data.tranData.income}} บาท</div>
                        <div class="col-2 col-md-2 col-sm-2">{{row.data.tranData.expense}} บาท</div>
                        <div class="col-3 col-md-3 col-sm-3">{{row.data.balance}} บาท</div>
                        <div class="col-2 col-md-2 col-sm-2"><button type="button" class="btn btn-danger btn-sm" @click="removeRow(row.id)">ลบแถว</button></div>
                    </div>
                </div>
            </div>
            <div v-else class="row pb-2 pt-2 border-dark bg-light text-center"> 
                <div class="col col-sm-12 col-md-12">
                    ไม่มีรายการให้แสดง
                </div>
            </div>
        </form>
        </div>
    </div>
</template>

<script>
import {firestore} from 'firebase'

export default {
    mounted () {
        // เปิดหน้าเว็ปมาเรียกใช้ให้ getdata()
        this.getData ()
    },
    data () {
        // กำหนดตัวแปรต่างๆ
        return {
            form: {
                date: '',
                income: 0,
                expense: 0,
            },
            incomeSum: 0,
            expenseSum: 0,
            goal: 0,
            totalBalance: 0,
            transactionList: [],
            username: this.$route.params.username
        }
    },
    methods: {
        // method การส่งข้อมูลขึ้น firestore
        sendForm () {
            var timestamp = this.getTimeStamp()
            this.form.income = parseInt(this.form.income)
            this.form.expense = parseInt(this.form.expense)
            firestore()
            .collection('transactions')
            .add({owner: this.username, timeStamp: timestamp, tranData: this.form, balance: this.form.income - this.form.expense})
            .then ((data) => {
                this.getData()
            })
        },
        // method การดึงข้อมูลจาก firestore
        getData () {
            firestore()
            .collection('transactions')
            .where('owner', '==', this.username)
            .orderBy('tranData.date', 'asc')
            .orderBy('timeStamp', 'asc')
            .onSnapshot(snapshot => {
                // console.log(snapshot)
                var newList = []
                this.incomeSum = 0
                this.expenseSum = 0
                this.totalBalance = 0
                snapshot.forEach(doc => {
                    newList.push({id: doc.id, data: doc.data()})
                    // console.log(doc.data())
                    this.incomeSum += parseInt(doc.data().tranData.income)
                    this.expenseSum += parseInt(doc.data().tranData.expense)
                    this.totalBalance += parseInt(doc.data().balance)
                });
                this.transactionList = newList
            })
        },
        // method ลบแถวแต่ละแถว
        removeRow(e) {
            firestore()
            .collection('transactions')
            .doc(e)
            .delete()
        },
        // method ล้างข้อมูลทุกแถว
        removeAllRows() {
            firestore()
            .collection('transactions')
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    if(doc.data().owner == this.username)
                        this.removeRow(doc.id)
                });
            })
        },
        // รับค่าเวลา
        getTimeStamp () {
            return  new Date().getTime()
        }
    },
    computed: {
        // การคำนวณเงินเก็บเฉลี่ยต่อวัน
        balanceAvg () {
            if (this.transactionList.length == 0){
                return 0
            }
            else{
                return this.totalBalance / this.transactionList.length
            }
        },
        // การคำนวณว่าเหลืออีกกี่วันจึงจะซื้อของได้
        daysLeft () {
            if (this.goal > this.totalBalance) {
                return parseInt((this.goal - this.totalBalance) / this.balanceAvg)+1
            }
            else{
                return 0
            }
        }
    }
}
</script>

<style>

h1, h2, label {
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