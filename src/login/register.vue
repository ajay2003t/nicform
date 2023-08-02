<template>
    <div class="container">
        <header>
            <h1>Dora</h1>
        </header>
        <h1 class="text-center" style="margin-top: 20px;">Register</h1>
        <form>
            <div class="mb-3">
                <label for="FullName" class="form-label">FullName</label>
                <input type="text" class="form-control" id="FullName" placeholder="FullName" v-model="fullname" required>
            </div>
            <div class="mb-3">
                <label for="Email" class="form-label">Email</label>
                <input type="email" class="form-control" id="Email" placeholder="Email" v-model="email" required>
            </div>
            <div class="mb-3">
                <label for="Password" class="form-label">Password</label>
                <input type="password" class="form-control" id="Password" placeholder="Password" v-model="password"
                    required>
                <div class="text-info" v-if="password.length < 6">password length want to be greater than 6</div>
            </div>
            <div class="mb-3">
                <label for="ReEnterpassword" class="form-label">ReEnterPassWord</label>
                <input type="password" class="form-control" id="ReEnterpassword" placeholder="ReEnter" v-model="reenter"
                    required>
            </div>
            <h4 class="text-danger" v-show="miss">Password mismatch</h4>
            <button type="submit" class="btn btn-primary" @click="click($event)"
                v-if="password.length >= 6 && fullname.length >= 1 && email.length >= 1 && reenter.length >= 1">Register
            </button>
        </form>
        <div>
            <h3 class="text-warning"
                v-if="password.length <= 6 || fullname.length <= 0 || email.length <= 0 || reenter.length <= 0">All The
                Field Is <span class="text-danger">Required</span> To Register</h3>
            <RouterLink to="/login" style="text-decoration: none;;" class="text-center text-danger">Already Register ?
            </RouterLink>
        </div>

    </div>
</template>

<script>
import firebase from "firebase"
import { RouterLink, RouterView } from 'vue-router'
export default {
    name: 'register',
    data() {
        return {
            fullname: '',
            email: '',
            password: '',
            reenter: '',
            miss: false,
            obj: '',
            nav: false
        }
    },
    methods: {
        click(event) {
            if (this.password != this.reenter) {
                this.miss = true
                this.password = ''
                this.reenter = ''
            }
            else {
                event.preventDefault();
                this.miss = false
                this.obj = {
                    'username': this.fullname,
                    'email': this.email,
                    'password': this.password
                }
                console.log(this.obj)
            }
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then((user) => {
                    // Signed in 
                    console.log(user.user)
                    if (firebase.auth().currentUser) {
                        this.$router.replace("login")
                    }
                    // ...
                })
                .catch((error) => {
                    alert('Unable to register user:' + error.messsage)
                });
        }
    }
}
</script>

<style scoped>
header{
    text-align: center;
    background: #007bff;
    color: white;
    height: 64px;

}
</style>