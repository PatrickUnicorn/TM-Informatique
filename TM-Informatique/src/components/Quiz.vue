<template>
  <div>
    <login-form
      v-if="!isAdmin && !isUser"
      @login="handleLogin"
      :isAdmin="isAdmin"
      :isUser="isUser"
    ></login-form>
    <div
      v-if="quizActive && questions.length > 0 && !quizComplete"
      class="quiz"
    >
      <h3 class="quiz__question">Questions:</h3>
      <div v-for="question in questions" :key="question.id">
        <h2>{{ question.title }}</h2>
        <div v-if="question.media.type === 'image'">
          <img
            v-if="question.media.data"
            :src="question.media.data"
            alt="Question Image"
            class="quiz__media quiz__media--image"
            width="560"
          />
        </div>

        <div
          v-else-if="question.media.type === 'video'"
          class="quiz__media quiz__media--video"
        >
          <iframe
            :src="embedUrl(question.media.data)"
            width="560"
            height="315"
            allowfullscreen
            style="border: 1px solid #e4e4e4; border-radius: 4px"
            frameborder="0"
          ></iframe>
        </div>
        <div v-if="!question.answerSelected" class="guesses-column">
          <label v-for="(guess, index) in question.guesses" :key="index">
            <input
              type="radio"
              :value="guess"
              v-model="question.selectedAnswer"
              :disabled="question.submitted"
            />
            {{ guess }}
          </label>
        </div>
        <div v-else>
          <div
            :class="{
              quiz__answer: true,
              'quiz__answer--selected': question.submitted,
            }"
          >
            You selected: {{ question.selectedAnswer }}
          </div>
        </div>
      </div>
      <button @click="submitQuiz">Submit Quiz</button>
    </div>
    <div v-if="isUser">
      <button
        @click="createQuiz"
        v-if="!quizComplete && !quizActive && questions.length > 0"
      >
        Start Quiz
      </button>
    </div>

    <div v-if="isAdmin">
      <button v-if="!quizActive" @click="toggleQuestionManager">
        Question Manager
      </button>
      <button
        @click="createQuiz"
        v-if="!quizComplete && !quizActive && questions.length > 0"
      >
        Start Quiz
      </button>

      <div v-if="showForm">
        <form @submit.prevent="addQuestion" class="question-form">
          <label class="question-form__label">
            Question Title:
            <input
              type="text"
              v-model="title"
              required
              class="question-form__input"
            />
          </label>
          <label class="question-form__label">
            Guesses (separated by commas):
            <input
              type="text"
              v-model="guesses"
              required
              class="question-form__input"
            />
          </label>
          <label class="question-form__label">
            Answer (must be one of the guesses):
            <select class="question-form__input" v-model="answer" required>
              <option v-for="guess in guessList" :value="guess">
                {{ guess }}
              </option>
            </select>
          </label>
          <label class="question-form__label">
            Media Type:
            <select class="question-form__input" v-model="selectedMediaType">
              <option value="">None</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="video">Geogebra classic</option>
            </select>
          </label>
          <label
            v-if="selectedMediaType === 'image'"
            class="question-form__label"
          >
            Media Data (URL):
            <input type="text" v-model="mediaData" required />
          </label>
          <label
            v-if="selectedMediaType === 'video'"
            class="question-form__label"
          >
            Media Data (URL):
            <input type="text" v-model="mediaData" required />
          </label>

          <button
            type="submit"
            class="question-form__button question-form__button--save"
          >
            Submit
          </button>
          <button
            type="button"
            @click="showForm = false"
            class="question-form__button question-form__button--cancel"
          >
            Cancel
          </button>
        </form>
      </div>

      <question-manager
        :isAdmin="isAdmin && !quizActive && !quizComplete"
        :questions="questions"
        :showQuestionManager="showQuestionManager"
        @add-question="showAddQuestionForm"
        @delete-question="deleteQuestion"
        @save-question="saveQuestion($event)"
      ></question-manager>
    </div>
    <div v-if="quizComplete" class="quiz-results">
      <button v-if="isAdmin" @click="resetQuiz" class="quiz-results__reset-btn">
        Reset Quiz
      </button>
      <h3 class="quiz-results__title">Quiz Results:</h3>
      <p class="quiz-results__score">
        You scored {{ score }} out of {{ questions.length }}.
      </p>
      <h4 class="quiz-results__question-title">Questions:</h4>
      <ul class="quiz-results__question-list">
        <li
          v-for="question in questions"
          :key="question.id"
          class="quiz-results__question-item"
        >
          <h2 class="quiz-results__question-heading">{{ question.title }}</h2>
          <ul class="quiz-results__guesses-list">
            <li
              v-for="(guess, index) in question.guesses"
              :key="index"
              class="quiz-results__guesses-item"
            >
              {{ guess }}
            </li>
          </ul>
          <p class="quiz-results__answer">Answer: {{ question.answer }}</p>
          <p class="quiz-results__your-answer">
            Your answer: {{ question.selectedAnswer }}
          </p>
          <p
            v-if="question.answer === question.selectedAnswer"
            class="quiz-results__result-correct"
          >
            Correct!
          </p>
          <p v-else class="quiz-results__result-incorrect">Incorrect</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import LoginForm from "./LoginForm.vue";
import QuestionManager from "./QuestionManager.vue";

export default {
  components: {
    LoginForm,
    QuestionManager,
  },
  data() {
    return {
      showForm: false,
      quizActive: false,
      quizComplete: false,
      questions: [],
      selectedAnswers: {},
      score: 0,
      title: "",
      guesses: "",
      answer: "",
      isAdmin: false,
      loginError: false,
      editingQuestion: null,
      addingQuestion: false,
      showQuestionManager: false,
      selectedQuestion: null,
      editingQuestionCopy: null,
      mediaData: "",
      selectedMediaType: "",
      isUser: false,
    };
  },

  methods: {
    resetQuiz() {
      this.quizComplete = false;
      this.score = 0;
      this.questions.forEach((question) => {
        question.selectedAnswer = null;
        question.answerSelected = false;
      });
      this.selectedAnswers = {};
    },

    handleLogin(userType) {
      if (userType === "admin") {
        this.isAdmin = true;
      } else if (userType === "user") {
        this.isUser = true;
      }
    },
    addQuestion() {
      const guessesList = this.guesses.split(",").map((guess) => guess.trim());
      this.questions.push({
        id: this.questions.length + 1,
        title: this.title,
        guesses: guessesList,
        answer: this.answer,
        media: {
          type: this.selectedMediaType,
          data: this.mediaData,
        },
      });

      this.clearFormData();
      localStorage.setItem("questions", JSON.stringify(this.questions));
    },

    clearFormData() {
      this.title = "";
      this.guesses = "";
      this.answer = "";
      this.selectedMediaType = "";
      this.mediaData = "";
      this.showForm = false;
    },

    embedUrl(url) {
      let embedUrl;

      if (url.includes("youtube.com") || url.includes("youtu.be")) {
        const videoId = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)[2];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      } else if (url.includes("vimeo.com")) {
        const videoId = url.split(/(vimeo\.com\/|video\/)/)[2];
        embedUrl = `https://player.vimeo.com/video/${videoId}`;
      } else if (url.includes("dailymotion.com")) {
        const videoId = url.split(/(dailymotion\.com\/video\/|dai\.ly\/)/)[2];
        embedUrl = `https://www.dailymotion.com/embed/video/${videoId}`;
      } else if (url.includes("geogebra.org")) {
        embedUrl = `${url}?embed&showToolBar=false`;
      } else {
        embedUrl = url;
      }

      return embedUrl;
    },

    createQuiz() {
      this.questions.forEach((question) => {
        if (!question.hasOwnProperty("media")) {
          question.media = {
            type: "",
            data: "",
          };
        } else {
          question.media.type = question.media.type || "";
          question.media.data = question.media.data || "";
        }
        question.selectedAnswer = null;
        question.answerSelected = false;
      });
      this.quizActive = true;
    },

    submitQuiz() {
      let numCorrect = 0;
      this.questions.forEach((question) => {
        if (question.selectedAnswer === question.answer) {
          numCorrect++;
        }
      });
      this.score = numCorrect;
      this.quizComplete = true;
      this.quizActive = false;
    },

    selectAnswer(question, guess) {
      this.$set(this.selectedAnswers, question.id, guess);
    },

    logout() {
      this.isAdmin = false;
      this.isUser = false;
    },

    deleteQuestion(question) {
      const index = this.questions.findIndex((q) => q.id === question.id);
      this.questions.splice(index, 1);
      localStorage.setItem("questions", JSON.stringify(this.questions));
    },
    saveQuestion(payload) {
      const { original, edited } = payload;

      if (this.addingQuestion) {
        this.addQuestion();
      } else if (original !== null) {
        const index = this.questions.findIndex((q) => q.id === original.id);
        this.questions.splice(index, 1, edited);
        localStorage.setItem("questions", JSON.stringify(this.questions));
      }
      this.selectedQuestion = null;
    },

    toggleQuestionManager() {
      this.showQuestionManager = !this.showQuestionManager;
    },
    showAddQuestionForm() {
      this.showForm = true;
      this.addingQuestion = true;
      this.selectedQuestion = null;
    },
  },
  mounted() {
    const questions = JSON.parse(localStorage.getItem("questions"));
    if (questions) {
      this.questions = questions;
    }
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
    guessList() {
      if (!this.guesses) {
        return [];
      }
      return this.guesses.split(",").map((guess) => guess.trim());
    },
    selectedQuestionGuesses() {
      if (this.selectedQuestion) {
        return this.selectedQuestion.guesses.join(", ");
      }
      return "";
    },
    selectedQuestionData() {
      if (this.selectedQuestion) {
        return {
          title: this.selectedQuestion.title,
          guesses: this.selectedQuestion.guesses.join(", "),
          answer: this.selectedQuestion.answer,
          media: {
            type: this.selectedQuestion.media.type,
            data: this.selectedQuestion.media.data,
          },
        };
      }
      return null;
    },
  },
  watch: {
    selectedQuestionGuesses(newVal) {
      if (this.selectedQuestion) {
        this.selectedQuestion.guesses = newVal
          .split(",")
          .map((guess) => guess.trim());
      }
    },
    showQuizQuestions() {
      return this.quizActive && this.questions.length > 0 && !this.quizComplete;
    },
  },
};
</script>
<style scoped>
h2 {
  font-size: 2rem;
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
.quiz {
  position: absolute;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  max-width: 800px;
  margin: 20px auto;
}

.quiz__question {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #000000;
}

.quiz__answer {
  font-size: 18px;
  margin-bottom: 10px;
  color: #000000;
}

.quiz__answer--selected {
  background-color: #4caf50;
  color: #ffffff;
}

.hidden {
  display: none;
}

.question-form {
  display: flex;
  flex-direction: column;
}

.question-form__label {
  margin-bottom: 5px;
}

.question-form__input {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}

.question-form__button {
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px;
}

.question-form__button--save {
  background-color: green;
  color: #fff;
}

.question-form__button--cancel {
  background-color: red;
  color: #fff;
}

.quiz-results {
  margin-top: 50px;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.quiz-results h3 {
  margin-top: 0;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.quiz-results p {
  margin: 10px 0;
  font-size: 18px;
  line-height: 1.4;
}

.quiz-results ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.quiz-results li {
  margin-bottom: 30px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
}

.quiz-results h2 {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: bold;
}

.quiz-results ul li ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.quiz-results ul li ul li {
  margin-bottom: 5px;
  font-size: 16px;
  line-height: 1.2;
}

@media screen and (max-width: 767px) {
  .quiz {
    max-width: 100%;
    padding: 10px;
  }

  .quiz__question {
    font-size: 20px;
    margin-bottom: 15px;
  }

  .quiz__answer {
    font-size: 16px;
    margin-bottom: 8px;
  }
}

.quiz-results {
  margin-top: 50px;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.quiz-results__reset-btn {
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px;
  background-color: #4caf50;
  color: #fff;
}

.quiz-results__title {
  margin-top: 0;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.quiz-results__score {
  margin: 10px 0;
  font-size: 18px;
  line-height: 1.4;
}

.quiz-results__question-title {
  margin: 20px 0;
  font-size: 24px;
  font-weight: bold;
}

.quiz-results__question-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.quiz-results__question-item {
  margin-bottom: 30px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
}

.quiz-results__question-heading {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: bold;
}

.quiz-results__guesses-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.quiz-results__guesses-item {
  margin-bottom: 5px;
  font-size: 16px;
  line-height: 1.2;
}

.quiz-results__answer {
  margin: 10px 0;
  font-size: 18px;
  line-height: 1.4;
}

.quiz-results__your-answer {
  margin: 10px 0;
  font-size: 18px;
  line-height: 1.4;
}

.quiz-results__result-correct {
  color: green;
}

.quiz-results__result-incorrect {
  color: red;
}

@media screen and (max-width: 767px) {
  .quiz-results {
    padding: 10px;
  }

  .quiz-results__title {
    font-size: 20px;
  }

  .quiz-results__score {
    font-size: 16px;
  }

  .quiz-results__question-title {
    font-size: 20px;
  }

  .quiz-results__question-item {
    margin-bottom: 15px;
  }

  .quiz-results__question-heading {
    font-size: 18px;
  }

  .quiz-results__guesses-item {
    font-size: 14px;
  }

  .quiz-results__answer {
    font-size: 16px;
  }

  .quiz-results__your-answer {
    font-size: 16px;
  }
}

@media screen and (min-width: 768px) and (max-width: 1023px) {
  .quiz {
    max-width: 600px;
  }

  .quiz-results {
    max-width: 600px;
  }
}

@media screen and (min-width: 1024px) {
  .quiz {
    max-width: 800px;
  }

  .quiz-results {
    max-width: 800px;
  }
}
</style>
