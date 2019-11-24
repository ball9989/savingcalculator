<template>
  <div>
    <div class="container mt-5">
      <div class="row text-center">
        <div class="col-12">
          <h1>โปรดกรอกข้อมูล #{{ username }}</h1>
        </div>
      </div>
      <form v-on:submit.prevent="sendForm()">
        <div class="row mt-5">
          <div class="col-12">
            <div class="form-row">
              <div class="col">
                <label for="dato">วันที่ :</label>
                <input
                  type="date"
                  id="dato"
                  class="form-control"
                  v-model="form.date"
                  placeholder="วันที่"
                  required
                />
              </div>
              <div class="col">
                <label for="incoma">รายรับ (บาท) :</label>
                <input
                  type="number"
                  min="0"
                  max="1000000"
                  id="incoma"
                  class="form-control"
                  v-model="form.income"
                  placeholder="รายรับ"
                  required
                />
              </div>
              <div class="col">
                <label for="raijai">รายจ่าย (บาท) :</label>
                <input
                  type="number"
                  id="raijai"
                  class="form-control"
                  v-model="form.expense"
                  placeholder="รายจ่าย"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-12 text-center">
            <button type="submit" class="btn btn-success btn-lg">ส่ง</button>
            <button class="btn btn-primary btn-lg">แสดงรายการ</button>
            <button
              class="btn btn-danger btn-lg"
              @click="$router.push({name: 'SavingCalculatorLogin'})"
            >ออกจากระบบ</button>
          </div>
        </div>
        <div class="row bg-dark text-center">
          <div class="col-3">
            <label for="dato">วันที่</label>
          </div>
          <div class="col-2">
            <label for="dato">รายรับ</label>
          </div>
          <div class="col-2">
            <label for="dato">รายจ่าย</label>
          </div>
          <div class="col-3">
            <label for="dato">คงเหลือ</label>
          </div>
          <div class="col-2">
            <label for="dato">ลบ</label>
          </div>
        </div>
        <div v-if="this.transactionList.length">
          <div v-for="row in transactionList">
            <div class="row pb-2 pt-2 border-bottom border-dark bg-light" style="text-align:center">
              <div class="col-3">{{row.data.tranData.date}}</div>
              <div class="col-2">{{row.data.tranData.income}} บาท</div>
              <div class="col-2">{{row.data.tranData.expense}} บาท</div>
              <div class="col-3">{{row.data.balance}} บาท</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { firestore } from "firebase";
export default {
  mounted() {
    this.getData();
  },
  data() {
    return {
      form: {
        date: "",
        income: 0,
        expense: 0
      },
      transactionList: [],
      username: this.$route.params.username
    };
  },
  methods: {
    sendForm() {
      var timestamp = this.getTimeStamp();
      this.form.income = parseInt(this.form.income);
      this.form.expense = parseInt(this.form.expense);
      firestore()
        .collection("transactions")
        .add({
          owner: this.username,
          timeStamp: timestamp,
          tranData: this.form,
          balance: this.form.income - this.form.expense
        })
        .then(data => {
          this.getData();
        });
    },
    getData() {
      firestore()
        .collection("transactions")
        .where("owner", "==", this.username)
        .orderBy("tranData.date", "asc")
        .orderBy("timeStamp", "asc")
        .onSnapshot(snapshot => {
          // console.log(snapshot)
          var newList = [];
          this.incomeSum = 0;
          this.expenseSum = 0;
          this.totalBalance = 0;
          snapshot.forEach(doc => {
            newList.push({ id: doc.id, data: doc.data() });
            // console.log(doc.data())
            this.incomeSum += parseInt(doc.data().tranData.income);
            this.expenseSum += parseInt(doc.data().tranData.expense);
            this.totalBalance += parseInt(doc.data().balance);
          });
          this.transactionList = newList;
        });
    },
    getTimeStamp() {
      return new Date().getTime();
    }
  }
};
</script>

<style>
h1,
label {
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