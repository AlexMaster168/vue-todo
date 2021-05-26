const App = {
    data() {
        return {
            placeholderString: 'Введите название заметки',
            title: 'Список заметок',
            inputValue: '',
            notes: ['Заметка 1', 'Заметка 2']
        }
    },
    template: `
    <div class="card">
        <h1 :style="{
         color: inputValue.length < 5 ? 'darkred' : 'darkblue',
         fontSize: inputValue.length < 6 ? '2rem' : '1.7rem'
        }">{{ title }}</h1>
        <div class="form-control">
            <input
                    type="text"
                    :placeholder="placeholderString"
                    v-model="inputValue"
                    @keypress.enter="addNewNote"
            />
        </div>
        <button class="btn" @click="addNewNote">Добавить</button>
        <hr/>
        <ul class="list" v-if="notes.length">
            <li class="list-item" v-for="(note, id) in notes">
                <!--<span :class="note.length > 5 ? 'primary' : 'bold'">{{ toUpperCase(note) }}</span>-->
<!--                <span :class="{-->
<!--                 'primary': true,-->
<!--                 'bold': note.length > 5-->
<!--                }">{{ toUpperCase(note) }}</span>-->
                <span :class="['bold', {'primary': note.length > 5}]">{{ toUpperCase(note) }}</span>
                <button class="btn danger" @click="removeNote(id)">Удалить</button>
            </li>
            <hr/>
            <li>
                <strong>Общее количество: {{ notes.length }}</strong> | Удвоенное: {{ doubleCountComputed }}
            </li>
        </ul>
        <div v-else>Заметок пока нет. Добавьте первую</div>
    </div>
    `,
    methods: {
        addNewNote() {
            if (this.inputValue) {
                this.notes.push(this.inputValue)
                this.inputValue = ''
            }
        },
        removeNote(id) {
            this.notes.splice(id, 1)
        },
        toUpperCase(item) {
            return item.toUpperCase()
        }
    },
    computed: {
        doubleCountComputed() {
            return this.notes.length * 2
        }
    },
    watch: {
        inputValue(value) {
            if (value.length > 50) {
                this.inputValue = ''
            }
        }
    }
}

Vue.createApp(App).mount('#app')