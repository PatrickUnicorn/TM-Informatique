<template>
  <div>
      <QuizForm v-if="!quizStarted" @create-quiz="createQuiz" />
      <button v-if="!quizStarted" @click="startQuiz">Start Quiz</button>
      <button v-if="quizStarted" @click="resetQuiz">Reset Quiz</button>
      <DragDropQuiz
        v-if="quizStarted"
        :question="question"
        :columnTitles="columnTitles"
        :initialElements="initialElements"
      />
  </div>
</template>

<script>
import DragDropQuiz from "../components/DragDropQuiz.vue";
import Quiz from "../components/Quiz.vue";
import QuizForm from "../components/QuizForm.vue";
export default {
  name: "HomePage",
  components: {
    Quiz,
    DragDropQuiz,
    QuizForm,
  },
  data() {
    return {
      quizStarted: false,
      question: "",
      columnTitles: [],
      initialElements: [],
    };
  },
  methods: {
    createQuiz(form) {
      this.question = form.question;
      this.columnTitles = form.columnTitles;
      this.initialElements = form.initialElements;
      localStorage.setItem("dragDropQuiz-data", JSON.stringify(form));
    },
    startQuiz() {
      const storedQuiz = localStorage.getItem("dragDropQuiz-data");
      if (storedQuiz) {
        const quizData = JSON.parse(storedQuiz);
        this.question = quizData.question;
        this.columnTitles = quizData.columnTitles;
        this.initialElements = quizData.initialElements;
        this.quizStarted = true;
      } else {
        alert("No quiz data found. Please create a quiz first.");
      }
    },
    resetQuiz() {
    this.quizStarted = false;
    this.question = "";
    this.columnTitles = [];
    this.initialElements = [];
    localStorage.removeItem("dragDropQuiz-data");
  },
  },
};
</script>
