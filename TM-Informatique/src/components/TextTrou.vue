<template>
  <div id="app">
    <h1>Fill in the Blanks Quiz Creator</h1>
    <div v-if="!quizCreated">
      <h2>Create a Question</h2>
      <form @submit.prevent="addQuestion">
        <div>
          <label for="question-text">Question Text:</label>
          <textarea
            id="question-text"
            v-model="newQuestion.text"
            required
            rows="4"
            cols="50"
          ></textarea>
        </div>
        <div
          v-for="(blank, index) in newQuestion.blanks"
          :key="'blank' + index"
        >
          <label :for="'blank-word' + index">Blank Word {{ index + 1 }}:</label>
          <input :id="'blank-word' + index" v-model="blank.word" required />
          <label :for="'options' + index">Options (separated by commas):</label>
          <input :id="'options' + index" v-model="blank.options" required />
          <button @click.prevent="removeBlank(index)" v-if="index > 0">
            Remove
          </button>
        </div>
        <button @click.prevent="addBlank">Add Another Blank</button>
        <button type="submit">Add Question</button>
      </form>
      <button @click="createQuiz" :disabled="questions.length === 0">
        Create Quiz
      </button>
    </div>
    <div v-else>
      <button @click="resetQuiz">Reset Quiz</button>
      <div v-for="(question, index) in questions" :key="index">
        <p v-html="formatQuestionText(question)"></p>
        <select
          v-for="(blank, blankIndex) in question.blanks"
          :key="'select' + blankIndex"
          v-model="userAnswers[index][blankIndex]"
          :disabled="quizSubmitted"
        >
          <option disabled value="">Select an option</option>
          <option v-for="option in blank.options" :key="option">
            {{ option }}
          </option>
        </select>
      </div>
      <button @click="submitAnswers" v-if="!quizSubmitted">
        Submit Answers
      </button>
      <div v-if="showResults">
        <h2>Results:</h2>
        <ul>
          <li v-for="(result, index) in results" :key="'result' + index">
            <p v-html="result.formattedText"></p>
            <b
              v-text="`${result.correct} out of ${result.total} blanks correct`"
            ></b>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quizCreated: false,
      showResults: false,
      quizSubmitted: false,
      userAnswers: [],
      results: [],
      newQuestion: {
        text: "",
        blanks: [
          {
            word: "",
            options: "",
          },
        ],
      },
      questions:
        JSON.parse(localStorage.getItem("fillInTheBlankQuestions")) || [],
    };
  },
  methods: {
    addQuestion() {
      const question = {
        type: "fillInBlanks",
        text: this.newQuestion.text,
        blanks: this.newQuestion.blanks.map((blank) => {
          return {
            word: blank.word,
            options: blank.options.split(",").map((option) => option.trim()),
          };
        }),
      };
      this.questions.push(question);
      localStorage.setItem(
        "fillInTheBlankQuestions",
        JSON.stringify(this.questions)
      );
      this.newQuestion.text = "";
      this.newQuestion.blanks = [
        {
          word: "",
          options: "",
        },
      ];
    },
    addBlank() {
      this.newQuestion.blanks.push({
        word: "",
        options: "",
      });
    },
    removeBlank(index) {
      this.newQuestion.blanks;
      this.newQuestion.blanks.splice(index, 1);
    },
    createQuiz() {
      this.quizCreated = true;
      this.userAnswers = this.questions.map((question) =>
        question.blanks.map(() => "")
      );
    },
    submitAnswers() {
      this.quizSubmitted = true;
      this.showResults = true;
      this.results = this.questions.map((question, index) =>
        this.checkAnswer(question, index)
      );
    },

    checkAnswer(question, index) {
      let userAnswerCorrect = 0;
      let totalBlanks = question.blanks.length;

      question.blanks.forEach((blank, blankIndex) => {
        if (blank.word === this.userAnswers[index][blankIndex]) {
          userAnswerCorrect += 1;
        }
      });

      console.log(
        `Question ${
          index + 1
        }: ${userAnswerCorrect} correct out of ${totalBlanks}`
      );

      return {
        correct: userAnswerCorrect,
        total: totalBlanks,
        formattedText: this.formatAnsweredText(question, index),
      };
    },

    formatAnsweredText(question, index) {
      let formattedText = question.text;
      question.blanks.forEach((blank, blankIndex) => {
        const answerPlaceholder = `<span style="color: ${
          blank.word === this.userAnswers[index][blankIndex] ? "green" : "red"
        }">${this.userAnswers[index][blankIndex]}</span>`;
        formattedText = formattedText.replace(blank.word, answerPlaceholder);
      });
      return formattedText;
    },
    resetQuiz() {
      this.quizCreated = false;
      this.showResults = false;
      this.userAnswers = [];
      this.quizSubmitted = false;
      localStorage.removeItem("questions");
      this.questions = [];
    },
    formatQuestionText(question) {
      let formattedText = question.text;
      question.blanks.forEach((blank, index) => {
        const blankPlaceholder = `_____${index + 1}_____`;
        formattedText = formattedText.replace(blank.word, blankPlaceholder);
      });
      return formattedText;
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}

form div {
  margin-bottom: 0.5rem;
}

label {
  font-size: 1rem;
  display: block;
  margin-bottom: 0.25rem;
}

input,
select,
button {
  font-size: 1rem;
  padding: 0.25rem 0.5rem;
  margin-bottom: 0.5rem;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2c3e50;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}
</style>
