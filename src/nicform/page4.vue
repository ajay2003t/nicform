<template>
    <div class="container">
        <header>
            <h1 class="text-center">API Security Information</h1>
        </header>
        <form @submit.prevent="save">
            <div class="form-group">
                <label for="api">API Key:</label>
                <input type="text" id="api" v-model="api" placeholder="Enter API Key">
            </div>
            <div class="form-group">
                <label for="encrypt">Encrypt:</label>
                <input type="text" id="encrypt" v-model="encrypt" placeholder="Enter Encrypt">
            </div>
            <div class="form-group">
                <label for="role">Roles:</label>
                <input type="text" id="role" v-model="role" placeholder="Enter Roles">
            </div>
            <h4 class="text-success" v-show="info">Data is saved</h4>
            <button type="submit">Save</button>
        </form>
    </div>
</template>
  
<script>
import { data2,idx2 } from './data'
import axios from 'axios';
export default {
    name: 'page4',
    data() {
        return {
            api:'',
            encrypt:'',
            role:'',
            info:false,
        }
    },
    methods: {
        save() {
            data2[idx2].push({ApiKey : this.api})
            data2[idx2].push({Encrypt: this.encrypt})
            data2[idx2].push({ Roles: this.role })
      axios.post('http://localhost:3002/api/data', data2)
        .then(() => {
          this.info = true
          console.log('Text saved successfully!');
          console.log(data2)
          idx2= idx2 + 1
        })
        .catch(error => {
          this.info = false
          console.error('Error saving text:', error);
        })
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

label,
.radio {
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

button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

form {
    margin-top: 4%;
    margin-left: 37%;
}
</style>