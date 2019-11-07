<template>
    <div>
        <div class="container">
            <div class="row text-center mt-5">
                <div class="col-12">
                    <h1>เข้าสู่ระบบ</h1>
                </div>
            </div>
            <div class="row text-center">
                <div class="col-12">
                    <div class="form-row">
                        <div class="col">
                            <label for="hello">กรอก ID:</label>
                            <input type="text" id="hello" v-model="username" class="form-control" placeholder="กรอก Username หากไม่มีก็ตั้งได้ทันที">
                            <button class="btn btn-success btn-block btn-lg mt-2" @click="$router.push({path: 'calculator/' + username})">เข้าสู่ระบบ</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                username: ''
            }
        } 
    }
</script>

<style>

h1, label {
    color: white;
    text-shadow: 3px 3px 3px black;
}

</style>
