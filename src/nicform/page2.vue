<template>
    <div class="container">
        <header>
            <h1 class="text-center">Token Information</h1>
        </header>
        <form>
            <div class="form-group">
                <p class="radio">Name:</p>
                <input type="radio" value="JWT" v-model="selectName" class="option">JWT
                <input type="radio" value="PASETO" v-model="selectName" class="option">PASETO
            </div>
            <div class="form-group">
                <label for="key">Key:</label>
                <input type="text" id="key" v-model="keyvalue" placeholder="Enter Key" required>
            </div>
            <div class="form-group">
                <label for="isuser">Issuer:</label>
                <input type="text" id="isuser" v-model="isuser" placeholder="Enter Issuer" required>
            </div>
            <h4 class="text-success" v-show="info">Data is saved</h4>
            <RouterLink to="/page3" class="button" @click="save($event)">Save</RouterLink>
        </form>
    </div>
</template>
  
<script>
import { data,idx } from './data'
import axios from 'axios';
export default {
    name: 'page2',
    data() {
        return {
            selectName: '',
            keyvalue: '',
            isuser: '',
            info: false,
        }
    },
    methods: {
        save(event) {
            event.preventDefault()
            data[idx].push({TokenName: this.selectName})
            data[idx].push({Key: this.keyvalue})
            data[idx].push({Isuser: this.isuser})
            axios.post('http://localhost:3001/api/data', data)
                .then(() => {
                    this.info = true
                    console.log('Text saved successfully!');
                    console.log(data)
                    idx=idx + 1
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

.button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 6px 26px;
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;
}

.button:hover {
    background-color: #0056b3;
}

form {
    margin-top: 4%;
    margin-left: 37%;
}

.option {
    margin-left: 6%;
}
</style>