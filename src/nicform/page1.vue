<template>
  <div class="container">
    <header>
      <h1 class="text-center">Database Information</h1>
    </header>
    <form @submit.prevent="save">
      <div class="form-group">
        <label for="name">Driver Name:</label>
        <input type="text" id="name" v-model="drivername" placeholder="Enter Driver Name" required>
      </div>
      <div class="form-group">
        <label for="roll">Database Url:</label>
        <input type="text" id="roll" v-model="databaseurl" placeholder="Enter Database Url" required>
      </div>
      <div class="form-group">
        <label for="user">Database UserName:</label>
        <input type="text" id="user" v-model="username" placeholder="Enter Database UserName" required>
      </div>
      <div class="form-group">
        <label for="key">Database Password:</label>
        <input type="password" id="key" v-model="password" placeholder="Enter Database Password " required class="password">
      </div>
      <h4 class="text-success" v-show="info">Data is saved</h4>
      <RouterLink to="/page2" class="button" @click="save($event)">Save</RouterLink>
    </form>
  </div>
</template>

<script>
import { data } from './data'
import axios from 'axios';
import { RouterLink, RouterView } from "vue-router"
export default {
  name: 'dora',
  data() {
    return {
      drivername: '',
      databaseurl: '',
      username: '',
      password: '',
      info: false,
    }
  },
  methods: {
    save(event) {
      event.preventDefault();
      data.push([
        {DriverClassName: this.drivername},
        {Databaseurl: this.databaseurl},
        {Url: this.databaseurl},
        {Username: this.username},
        {Password: this.password}
      ])
      axios.post('http://localhost:3001/api/data', data)
        .then(() => {
          this.info = true
          console.log('Text saved successfully!');
          console.log(data)
        })
        .catch(error => {
          this.info = false
          console.error('Error saving text:', error);
        })
    }
  },
  provide(){
    return{
      res: this.data,
      id: this.idx
    }
  }
}
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

header {
  background-color: #007bff;
  color: white;
  height: 64px;
  text-align: center;
}

#app {
  width: 300px;
}

.form-group {
  margin-bottom: 40px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input[type="text"],
input[type="email"] {
  width: 45%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 6px 26px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  text-decoration: none;
}

button:hover {
  background-color: #0056b3;
}

form {
  margin-top: 4%;
  margin-left: 37%;
}

.password {
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  width: 45%;
  height: 42px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>





