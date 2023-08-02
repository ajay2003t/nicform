<template>
    <div class="container">
        <header>
            <h1 class="text-center">Rest API Information</h1>
        </header>
        <form>
            <div class="form-group">
                <label for="key">EndPoint:</label>
                <input type="text" id="key" v-model="endpoint" placeholder="Enter EndPoint">
            </div>
            <div class="form-group">
                <p class="radio" style="display: inline;">Method:</p>
                <input type="radio" value="GET" v-model="selectMethod" class="option">GET
                <input type="radio" value="POST" v-model="selectMethod" class="option">POST
            </div>
            <div class="form-group">
                <label for="input">Input:</label>
                <div v-for="(add, index) in add">
                    <input type="text" id="input" v-model="input[index]" placeholder="Enter Input">
                    <span class="dropdown">DataType:</span>
                    <select id="datatype" v-model="datatype[index]" placeholder="DATA">
                        <option value="VARCHAR">VARCHAR</option>
                        <option value="Array">Array</option>
                        <option value="Int">Int</option>
                        <option value="Boolean">Boolean</option>
                    </select>
                    <button class="saveinput" @click="inputsave($event, index)" v-show="saveshow[index]">Save Input</button>
                    <button class="addother" @click="addanother">+</button>
                    <p v-show="info[index]" class="text-danger">Input is missing</p>
                </div>
            </div>
            <div class="form-group">
                <label for="optioninput">Optional Input:</label>
                <div v-for="(addoption, index) in addoption">
                    <input type="text" id="optioninput" v-model="optioninput[index]" placeholder="Enter Optional Input">
                    <span class="dropdown">DataType:</span>
                    <select id="datatype" v-model="optiondatatype[index]" placeholder="DATA">
                        <option value="String">String</option>
                        <option value="Array">Array</option>
                        <option value="Int">Int</option>
                        <option value="Boolean">Boolean</option>
                    </select>
                    <button class="saveinput" @click="optioninputsave($event, index)" v-show="optionsaveshow[index]">Save
                        Input</button>
                    <button class="addother" @click="optionaddanother">+</button>
                    <p v-show="optioninfo[index]" class="text-danger">Input is missing</p>
                </div>
            </div>
            <div class="form-group">
                <label for="query">Query:</label>
                <textarea id="query" placeholder="Enter you Query..." v-model="query"></textarea>
            </div>
            <RouterLink to="/page4" class="button" @click="save($event)">Save</RouterLink>
        </form>
    </div>
</template>
  
<script>
import { data2 } from './data'
import axios from 'axios';
import query from 'express/lib/middleware/query';
import { RouterLink, RouterView } from 'vue-router';
export default {
    name: 'page3',
    data() {
        return {
            selectMethod: '',
            endpoint: '',
            input: [],
            datatype: [],
            inputField: [],
            add: 1,
            optioninput: [],
            optiondatatype: [],
            optioninputField: [],
            addoption: 1,
            query: '',
            saveshow: [true],
            optionsaveshow: [true],
            info: [false],
            optioninfo: [false]
        }
    },
    methods: {
        save(event) {
            event.preventDefault()
            data2.push([
                {EndPoint: this.endpoint},
                {Method: this.selectMethod},
                {Inputs: this.inputField},
                {OptionalInputs: this.optioninputField},
                {Query: this.query}

            ])
            axios.post('http://localhost:3002/api/data', data2)
                .then(() => {
                    this.info = true
                    console.log('Text saved successfully!');
                    console.log(data2)
                })
                .catch(error => {
                    this.info = false
                    console.error('Error saving text:', error);
                })
        },
        inputsave(event, index) {
            event.preventDefault()
            const inputdata = this.input[index]
            if (this.datatype[index] == undefined || inputdata.trim() == '') {
                this.info[index] = true
            }
            else {
                this.inputField.push(this.input[index] + ' : ' + this.datatype[index])
                this.saveshow[index] = false
                this.saveshow.push(true)
                this.info[index] = false
                console.log(2 + 3)
            }

        },
        addanother(event) {
            event.preventDefault()
            this.add = this.add + 1
            this.saveshow.push(true)
        },
        optioninputsave(event, index) {
            event.preventDefault()
            const inputdata = this.optioninput[index]
            if (this.optiondatatype[index] == undefined || inputdata.trim() == '') {
                this.optioninfo[index] = true
            }
            else {
                this.optioninputField.push(this.optioninput[index] + ' : ' + this.optiondatatype[index])
                this.optionsaveshow[index] = false
                this.optionsaveshow.push(true)
                this.optioninfo[index] = false
            }
        },
        optionaddanother(event) {
            event.preventDefault()
            this.addoption = this.addoption + 1
            this.optionsaveshow.push(true)
        },
    },
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
    margin-bottom: 15px;
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
    margin-top: 2%;
    margin-left: 5%;
}

.option {
    margin-left: 3%;
}

select {
    margin-left: 2%;
    height: 32px;
    width: 13%;
}

.dropdown {
    font-weight: bold;
    margin-bottom: 5px;
    margin-left: 3%;
}

.addother {
    margin-left: 2%;
    height: 34px;
    width: 8%;
    background-color: black;
    color: white;
    border: transparent;
    border-radius: 50%;
}

.saveinput {
    margin-left: 2%;
    height: 34px;
    width: auto;
    background-color: #007bff;
    border: transparent;
    color: white;
    border-radius: 21%;
}

textarea {
    width: 80%;
    height: 200px;
    resize: both;
}
</style>