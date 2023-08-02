<template>
    <div class="container">
        <div class="top">
            <header>
            <h1 class="dora">Dora</h1>
            <nav>
                <RouterLink to="/" class="tonext">Register</RouterLink>
            </nav>
        </header>
        </div>
        <h1 class="text-center" style="margin-top: 35px; margin-right: 2%;">Login-page</h1>

        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">UserName(Email)</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email"
                required>
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" v-model="password" required>
        </div>
        <h3 v-show="success" class="text-success">Successfully</h3>
        <h3 v-show="err" class="text-danger">Check username and password</h3>
        <a><button type="submit" class="btn btn-primary" @click=submit()>Log-in</button></a>

    </div>
</template>

<script>
import firebase from "firebase"
export default {
    name: 'login',
    data() {
        return {
            email: '',
            password: '',
            success: false,
            err: false
        }
    },
    methods: {
        submit() {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then((user) => {
                    // Signed in
                    console.log(user.user);
                    this.success = true
                    this.err = false
                    alert("success")
                    if (firebase.auth().currentUser) {
                        this.$router.replace("page1")
                    }
                    // ...
                })
                .catch((error) => {
                    this.err = true
                    this.success = false
                });

        }
    }

}
</script>

<style scoped>

.tonext{
    text-decoration: none;
    color: white;
    margin-right: 10px;
}
header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    background: #007bff;
    color: white;
    height: 64px;
}
.dora{
    margin-left: 10px;
}
</style>