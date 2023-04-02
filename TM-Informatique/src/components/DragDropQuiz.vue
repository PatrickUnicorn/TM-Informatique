<template>
  <div class="drag-drop-quiz">
    <h1>{{ question }}</h1>

    <div v-for="(title, index) in columnTitles" :key="index" class="column">
      <h2>{{ title }}</h2>
      <CustomDragDrop
        class="column-content"
        :elements="columns[index]"
        @drop="onDrop(index, $event)"
      />
    </div>
  </div>
</template>

<script>
import CustomDragDrop from './CustomDragDrop.vue';

export default {
  components: {
    CustomDragDrop,
  },
  props: {
    question: String,
    columnTitles: Array,
    initialElements: Array,
  },
  data() {
    return {
      columns: [],
    };
  },
  created() {
    this.initializeColumns();
  },
  methods: {
    initializeColumns() {
      this.columns = this.columnTitles.map(() => []);
      const elements = this.initialElements.slice();

      while (elements.length) {
        const index = Math.floor(Math.random() * this.columns.length);
        this.columns[index].push(elements.pop());
      }
    },
    onDrop(targetColumnIndex, event) {
      const { element, sourceIndex } = event;
      const sourceColumnIndex = this.columns.findIndex((column) =>
        column.includes(element)
      );

      if (sourceColumnIndex !== -1) {
        this.columns[sourceColumnIndex].splice(sourceIndex, 1);
        this.columns[targetColumnIndex].push(element);
      }
    },
  },
};
</script>

<style scoped>
.drag-drop-quiz {
  margin: 10px;
}

.column {
  display: inline-block;
  vertical-align: top;
  margin-right: 10px;
  text-align: center;
}

.column h2 {
  margin-bottom: 5px;
}

.column-content {
  background-color: #f1f1f1;
  border: 1px solid #cccccc;
  border-radius: 5px;
  padding: 5px;
  min-height: 60px;
  min-width: 100px;
  display: inline-block;
}

.element {
  background-color: #e0e0e0;
  border: 1px solid #999999;
  border-radius: 3px;
  padding: 3px;
  margin-bottom: 5px;
  cursor: move;
}

</style>

