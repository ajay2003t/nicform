<template>
  <header>
    <h1 class="text-center">Dora Editor</h1>
  </header>
  <div class="text-editor">
    <textarea class="editor" v-model="text" rows="10" cols="50" placeholder="Enter Your Text"
      @input="updateUploadedFileContent"></textarea>
    <input type="text" placeholder="FileName" v-model="filename" class="filename">
    <button class="save-button" @click="saveText" v-show="showsave">Save</button>
    <diV>
      <input type="file" @change="onFileChange" accept="yaml" class="file" @click="show">
      <button @click="addinfo" class="save-change">Save Changes</button>
    </diV>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      text: '',
      filename: '',
      uploadedFileContent: "",
      showsave: true,
      showchange: false,
      data: []
    };
  },
 // updated(){
   // this.data.push({text: this.text,filename: this.filename})
 // },
  methods: {
    loadText() {
      axios.get('http://localhost:3003/api/data')
        .then(response => {
          this.text = response.data.text || '';
        })
        .catch(error => {
          console.error('Error loading text:', error);
        });
    },
    saveText() {
      if (this.text.length > 0 && this.filename.length > 0) {
        axios.post('http://localhost:3003/api/data', this.data)/////json content
          .then(() => {
            const yamlContent = `content: ${this.text}`
            const blob = new Blob([yamlContent], { type: 'text/yaml' })
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = this.filename + '.yaml' 
            link.click();
            console.log('Text saved successfully!');
            console.log(this.data)
          })
          .catch(error => {
            console.error('Error saving text:', error);
          });

      }
      else {
        alert('Some Field is Missing')
      }
    },
    onFileChange(event) {
      // Handle file upload
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.text = e.target.result;
          this.uploadedFileContent = e.target.result;
        };
        reader.readAsText(file);
      }
    },
    updateUploadedFileContent() {
      // Update the uploaded file content with the text editor content
      this.uploadedFileContent = this.text;
    },
    saveChanges() {
      if (this.text.length > 0 && this.filename.length > 0) {
        axios.post(' http://localhost:3003/api/data', { filename: this.filename, body: this.text })
        const blob = new Blob([this.uploadedFileContent], { type: "text/yaml" });
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = this.filename + ".yaml";
        downloadLink.click()
      }
      else {
        alert('Some Field is Missing')
      }
    },
    show() {
      this.showsave = false
      this.showchange = true
      if (this.text.length > 0) {
        this.showsave = true
        this.showchange = false
      }
    },
    addinfo(){
      this.data.push({text: this.text,filename: this.filename})
    }
  }
}
</script>

<style scoped>
.text-editor {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.editor {
  width: 84%;
  height: 450px;
  padding: 10px;
  font-size: 14px;
  border-radius: 20px;
  border: 5px solid green;
}

.filename {
  margin-top: 30px;
  padding: 10px 16px;
}

.save-button {
  margin-top: 15px;
  padding: 8px 16px;
  font-size: 16px;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.save-button:hover {
  background-color: #45a049;
}

.file {
  margin-top: 3%;
  margin-left: 18%;
}

.save-change {
  margin-top: 0px;
  padding: 8px 16px;
  font-size: 16px;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  /* margin-left: 123%; */
  /* margin-bottom: -65%; */
  position: relative;
  bottom: 36px;
  left: 79%;
}

.save-change:hover {
  background-color: #45a049;
}
</style>

  
  