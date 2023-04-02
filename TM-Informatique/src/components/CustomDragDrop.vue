<template>
  <div class="drop-zone" @drop="onDrop($event)" @dragenter.prevent @dragover.prevent>
    <div
      v-for="(element, index) in elements"
      :key="index"
      class="drag-el"
      draggable="true"
      @dragstart="startDrag($event, element, index)"
      v-text="element"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    elements: {
      type: Array,
      required: true,
    },
  },
  methods: {
    startDrag(event, element, index) {
      event.dataTransfer.dropEffect = 'move';
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('element', element);
      event.dataTransfer.setData('sourceIndex', index);
    },
    onDrop(event) {
      const element = event.dataTransfer.getData('element');
      const sourceIndex = parseInt(event.dataTransfer.getData('sourceIndex'), 10);

      this.$emit('drop', { element, sourceIndex });
    },
  },
};
</script>

<style>
.custom-drag-drop {
  display: flex;
  flex-direction: column;
}

.drag-el {
  background-color: red;
  color: black;
  border-radius: 3px;
  padding: 3px;
  margin-bottom: 5px;
  cursor: move;
}
</style>
