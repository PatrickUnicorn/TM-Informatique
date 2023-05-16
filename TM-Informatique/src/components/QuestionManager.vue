<template>
  <div v-if="isAdmin && showQuestionManager">
    <h2>Question Manager</h2>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Guesses</th>
          <th>Answer</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="question in questions" :key="question.id">
          <td>{{ question.title }}</td>
          <td>{{ question.guesses.join(", ") }}</td>
          <td>{{ question.answer }}</td>
          <td>
            <button
              @click="
                selectedQuestion = question;
                editingQuestionCopy = JSON.parse(JSON.stringify(question));
                if (!editingQuestionCopy.media) {
                  editingQuestionCopy.media = { type: '', data: '' };
                }
              "
            >
              Edit
            </button>

            <button @click="deleteQuestion(question)">
              Delete {{ question.title }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="addQuestion" v-if="!showForm">Add Question</button>

    <div v-if="selectedQuestion" class="edit-form">
      <h3 class="edit-form__title">Edit Question</h3>
      <form class="edit-form__form">
        <label class="edit-form__label">
          Question Title:
          <input
            type="text"
            v-model="editingQuestionCopy.title"
            required
            class="edit-form__input"
          />
        </label>
        <label class="edit-form__label">
          Guesses (separated by commas):
          <input
            type="text"
            v-model="editingQuestionGuesses"
            required
            class="edit-form__input"
          />
        </label>
        <label class="edit-form__label">
          Answer (must be one of the guesses):
          <select
            v-model="editingQuestionCopy.answer"
            required
            class="edit-form__select"
          >
            <option v-for="guess in editingQuestionCopy.guesses" :value="guess">
              {{ guess }}
            </option>
          </select>
        </label>
        <label class="edit-form__label">
          Media Type:
          <select
            v-model="editingQuestionCopy.media.type"
            class="edit-form__select"
          >
            <option value="">None</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="video">Geogebra</option>
          </select>
        </label>
        <label
          class="edit-form__label"
          v-if="editingQuestionCopy.media.type === 'video'"
        >
          Media Data (URL):
          <input
            type="text"
            v-model="editingQuestionCopy.media.data"
            required
            class="edit-form__input"
          />
        </label>
        <label
          class="edit-form__label"
          v-if="editingQuestionCopy.media.type === 'image'"
        >
          Media Data (URL):
          <input
            type="text"
            v-model="editingQuestionCopy.media.data"
            required
            class="edit-form__input"
          />
        </label>

        <button
          type="button"
          @click="saveQuestion"
          class="edit-form__button edit-form__button--save"
        >
          Save
        </button>

        <button
          type="button"
          @click="selectedQuestion = null"
          class="edit-form__button edit-form__button--cancel"
        >
          Cancel
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isAdmin: {
      type: Boolean,
      default: false,
    },
    questions: {
      type: Array,
      default: () => [],
    },
    showQuestionManager: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showForm: false,
      selectedQuestion: null,
      editingQuestionCopy: null,
    };
  },
  computed: {
    editingQuestionGuesses: {
      get() {
        if (this.editingQuestionCopy) {
          return this.editingQuestionCopy.guesses.join(", ");
        }
        return "";
      },
      set(newVal) {
        if (this.editingQuestionCopy) {
          this.editingQuestionCopy.guesses = newVal
            .split(",")
            .map((guess) => guess.trim());
        }
      },
    },
  },
  methods: {
    deleteQuestion(question) {
      this.$emit("delete-question", question);
    },
    saveQuestion() {
      this.$emit("save-question", {
        original: this.selectedQuestion,
        edited: this.editingQuestionCopy,
      });
      this.selectedQuestion = null;
    },

    addQuestion() {
      this.$emit("add-question");
    },
  },
};
</script>

<style scoped>
.hidden {
  display: none;
}
.add-question-form button[type="submit"]:hover {
  background-color: #0062cc;
}
.edit-form {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
}

.edit-form__title {
  font-size: 20px;
  margin-bottom: 10px;
}

.edit-form__form {
  display: flex;
  flex-direction: column;
}

.edit-form__label {
  margin-bottom: 5px;
}

.edit-form__input {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}

.edit-form__select {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}

.edit-form__button {
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px;
}

.edit-form__button--save {
  background-color: green;
  color: #fff;
}

.edit-form__button--cancel {
  background-color: red;
  color: #fff;
}
.guesses-column {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10px;
}

.guesses-column label {
  display: block;
  margin-bottom: 5px;
}

.container {
  position: absolute;
  top: 0;
  left: 0;
}

.form {
  display: flex;
  flex-direction: column;
}

.form label {
  margin-bottom: 0.5rem;
}

.form input[type="text"],
.form input[type="url"] {
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 2px solid #ddd;
  border-radius: 4px;
}

.form input[type="submit"] {
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 1rem;
}

table th,
table td {
  padding: 0.5rem;
  text-align: left;
  border: 2px solid #ddd;
}

table th {
  background-color: #f2f2f2;
  color: #333;
}

table td a {
  color: #4caf50;
}

.delete-button {
  padding: 0.5rem;
  background-color: #f44336;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #fff;
}

form input[type="submit"] {
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

form input[type="submit"]:hover {
  background-color: #45a049;
}

button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
}
</style>
