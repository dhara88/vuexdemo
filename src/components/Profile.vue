
<template>
  <div class="container">
        <label class="logoutLblPos">
                <a  href="/login" @click="logout()">{{username}}Logout</a>
        </label>
        <div class="card">
            <div class="card-body">
                <form v-on:submit.prevent="login">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" class="form-control" v-model="name"  autofocus  v-on:init="validName=true;nameDirty=false;" v-on:input="validName=name!=''; nameDirty =true;"/> 
                        <span v-if="!validName && nameDirty" style="color:red">Required*</span>   
                    </div>
                    <div class="form-group">
                        <label>Age</label>
                        <input type="text" class="form-control" v-model="age"  autofocus  v-on:init="validAge=true;ageDirty=false;"  v-on:input="validAge=age!=''; ageDirty =true;"/>
                        <span v-if="!validAge && ageDirty" style="color:red">Required*</span>                                    
                    </div>
                    <div class="form-group">
                        <label>Gender</label>
                        <input type="text" class="form-control" v-model="gender"  autofocus  v-on:init="validGender=true;genderDirty=false;"  v-on:input="validGender=gender!=''; genderDirty =true;"/>
                        <span v-if="!validGender && genderDirty" style="color:red">Required*</span>                                    
                    </div>
                    <div class="form-group">
                        <draggable v-model="skillArray"  @end="onEnd" >
                            <transition-group type="transition" name="flip-list">
                            <div class="sortable" :id="element.id" v-for="(element,key) in skillArray" :key="element.id">
                                <strong>{{element.id}}.  </strong>
                                <strong>{{element.name}}</strong>
                                <strong><button type="button" class="close" aria-label="Close" @click="$delete(skillArray, key)"><span aria-hidden="true">&times;</span></button></strong>
                            </div>
                            </transition-group>
                        </draggable>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>


<script>
import draggable from 'vuedraggable'

export default {
  components: {
      draggable
  },
  data:function() { 
      return {
        nameDirty:'',
        validName:false  ,
        validAge:false,
        ageDirty:'',
        validGender:false,
        genderDirty:'',
        name: localStorage.getItem('name'),
        age: localStorage.getItem('age'),
        gender: localStorage.getItem('gender'),
        skillArray :[
            {name:"Javascript", id:1},
            {name:"Python", id:2},
            {name:"React", id:3},
            {name:"Java",id:4},
            {name:"C++",id:5}
            ],
        oldIndex:'',
        newIndex:'',
        username:''
      }
  }, 
   watch: {
    name(newName) {
      localStorage.setItem('name', newName)
    },
    age(newAge) {
        localStorage.setItem('age', newAge)
    },
    gender(newGender) {
        localStorage.setItem('gender', newGender)
    },
    
    deep: true
    
  },
  async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/login');
    }
    this.username = this.$store.getters.getUser;
  },
  methods: {
        onEnd:function(evt){
          this.oldIndex = evt.oldIndex;
          this.newIndex = evt.newIndex;
          this.reorder(this.oldIndex, this.newIndex);
        },
        reorder(oldIndex, newIndex) {
            this.skillArray.splice(newIndex, 0, this.skillArray.splice(oldIndex, 1)[0]);
            this.skillArray.forEach(function(item, index){
            item.order = index; 
            });
        },
      logout() {
            this.$store.dispatch('logout');
            this.$router.push('/login');
    }
    }  
}
</script>
<style scoped>
    .logoutLblPos{
        position:fixed;
        right:10px;
        top:5px;
    }
    .sortable{
        width:100%;
        background: teal;
        padding: 1em;
        cursor: move;
        margin-bottom: 2px;
    }
    .sortable-drag{
        opacity: 0;
    }
    .flip-list-move{
        transition: transform 0.5s;
    }
</style>