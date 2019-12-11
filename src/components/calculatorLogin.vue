<template>
    <div>    
        <div class="container">
            <div class="row mt-5 mb-4"></div>
                        <div class="row mt-5 mb-4"></div>
                                    <div class="row mt-5 mb-5"></div>
                                                <div class="row mt-5 mb-5"></div>

           
            <div class="row text-center mt-5">
                <div class="col col-md-12 col-sm-12">
                    <h1 class="mb-4">Saving calculator</h1>
                    <h2>เข้าสู่ระบบ</h2> 
                </div>
            </div>
            <div class="row text-center">
                <div class="col col-md-12 col-sm-12">
                    <div class="form-row">
                        <div class="col col-md-12 col-sm-12">
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

h2, label {
    color: white;
    text-shadow: 3px 3px 3px black;
}
h1{
    color: white;
    text-shadow: 3px 3px 3px black;
    font-size: 50px
}

</style>
