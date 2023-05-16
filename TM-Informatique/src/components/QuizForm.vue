<template>
  <div>
    <form class="form-wrapper" @submit.prevent="submitQuizForm">
      <div class="form-group">
        <label for="question">Question:</label>
        <input id="question" v-model="form.question" type="text" required />
      </div>

      <div
        class="form-group"
        v-for="(title, index) in form.columnTitles"
        :key="index"
      >
        <label :for="`column-title-${index}`"
          >Column Title {{ index + 1 }}:</label
        >
        <input
          :id="`column-title-${index}`"
          v-model="form.columnTitles[index]"
          type="text"
          required
        />
      </div>

      <button class="form-group" type="button" @click="addColumn">
        Add Column
      </button>

      <div
        class="form-group"
        v-for="(element, index) in form.initialElements"
        :key="index"
      >
        <label :for="`element-${index}`">Element {{ index + 1 }}:</label>
        <input
          :id="`element-${index}`"
          v-model="form.initialElements[index]"
          type="text"
          required
        />
      </div>

      <button class="form-group" type="button" @click="addElement">
        Add Element
      </button>

      <button class="form-group" type="submit" @click="create">
        Create Quiz
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        question: "",
        columnTitles: ["", ""],
        initialElements: ["", "", "", ""],
      },
    };
  },
  methods: {
    addColumn() {
      this.form.columnTitles.push("");
    },
    addElement() {
      this.form.initialElements.push("");
    },
    submitQuizForm() {
      const isValid =
        this.form.columnTitles.every((title) => title.trim() !== "") &&
        this.form.initialElements.every((element) => element.trim() !== "") &&
        this.form.question.trim() !== "";
      if (isValid) {
        const form = {
          question: this.form.question,
          columnTitles: this.form.columnTitles,
          initialElements: this.form.initialElements,
        };
        this.$emit("create-quiz", form);
        this.resetForm();
      } else {
        alert(
          "All fields are required. Please fill out all fields before submitting."
        );
      }
    },

    create() {
      this.$emit("Created", true);
    },
    resetForm() {
      this.form.question = "";
      this.form.columnTitles = ["", ""];
      this.form.initialElements = ["", "", "", ""];
    },
  },
};
</script>
<style scoped>
.form-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px;
}

.form-group {
  margin-bottom: 10px;
}

.form-group input {
  display: block;
  margin-top: 5px;
}

button[type="submit"] {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 12px 20px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}
</style>
