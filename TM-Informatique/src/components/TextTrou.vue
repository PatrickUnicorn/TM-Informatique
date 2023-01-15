<template>
    <div class="quiz-container">
        <div v-html="textWithBlanks" class="quiz-text"></div>
        <form>
        <div v-for="(blank, index) in blanks" :key="index" class="quiz-item">
            <label class="quiz-label">{{blank.label}}</label>
            <input v-model="blank.answer" type="text" class="quiz-input">
        </div>
        <button @click.prevent="submitQuiz" class="quiz-button">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            text: 'The capital of France is ___1___. The Eiffel Tower is located in ___2___. The Louvre Museum is also located in ___3___.',
            blanks: [
                { label: 'Blank 1', answer: '' },
                { label: 'Blank 2', answer: '' },
                { label: 'Blank 3', answer: '' },
            ],
        }
    },
    computed: {
        textWithBlanks() {
            let textCopy = this.text;
            this.blanks.forEach((blank, index) => {
                textCopy = textCopy.replace(`___${index + 1}___`, `<span class="blank">___${index + 1}___</span>`);
            });
            return textCopy;
        },
    },
    methods: {
        submitQuiz() {
            this.blanks.forEach((blank, index) => {
                this.text = this.text.replace(`___${index + 1}___`, blank.answer);
            });
        },
    },
}
</script>

<style>
.quiz-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  flex-direction: column;
}

.quiz-text {
  text-align: center;
}

.quiz-text .blank {
  background-color: #f2f2f2;
  padding: 2px 4px;
  border-radius: 4px;
}

.quiz-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.quiz-label {
  font-weight: bold;
  margin-right: 10px;
}

.quiz-input {
  padding: 4px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.quiz-button {
  background-color: #4CAF50;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}
</style>

