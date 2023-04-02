<template>
  <div>
    <Quiz/>
    <!-- <div>
      <QuizForm v-if="!quizStarted" @create-quiz="createQuiz" />
      <button v-if="!quizStarted" @click="startQuiz">Start Quiz</button>
      <DragDropQuiz
        v-if="quizStarted"
        :question="question"
        :columnTitles="columnTitles"
        :initialElements="initialElements"
      />
    </div> -->
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
      localStorage.setItem("dragDropQuiz", JSON.stringify(form));
    },
    startQuiz() {
      const storedQuiz = localStorage.getItem("dragDropQuiz");
      if (storedQuiz) {
        const quizData = JSON.parse(storedQuiz);
        this.question = quizData.question;
        this.columnTitles = quizData.columnTitles;
        this.initialElements = quizData.initialElements;
      }
      this.quizStarted = true;
    },
  },
};
</script>
