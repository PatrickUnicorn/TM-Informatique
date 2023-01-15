<template>
<div class="wrapper">
    <h2>
        Question 3
    </h2>
    <div class="DragNdrop">
        <div 
            class="drop-zone"
            @drop="onDrop($event, 1)"
            @dragenter.prevent
            @dragover.prevent>
            <div 
                v-for="item in getList(1)" 
                :key="item.id" 
                class="drag-el"
                draggable="true"
                @dragstart = "startDrag($event, item)"
                v-text="item.title">
            </div>
        </div>
        <div 
            class="drop-zone"
            @drop="onDrop($event, 2)"
            @dragenter.prevent
            @dragover.prevent>
            <div 
                v-for="item in getList(2)" 
                :key="item.id" 
                class="drag-el"
                draggable="true"
                @dragstart = "startDrag($event, item)"
                v-text ="item.title">
            </div>
        </div>
    </div>
</div>
</template>
    
<script>
    import { ref } from 'vue'
    export default {
        setup () {
            const items = ref([
                { id: 0, title: 'item A', list: 1},
                { id: 1, title: 'item B', list: 2},
                { id: 2, title: 'item C', list: 2},
            ])
    
            const getList = (list) => {
                console.log(items.value)
                let itemFilter = items.value.filter((item) => item.list == list)
                return itemFilter
                
            }
            const startDrag = (event, items) => {
                event.dataTransfer.dropEffect = 'move'
                event.dataTransfer.effectAllowed = 'move'
                event.dataTransfer.setData('itemID', items.id)
            }
            const onDrop = (event, list) => {
                const itemID = event.dataTransfer.getData('itemID')
                const item = items.value.find((item) => item.id == itemID)
                
                item.list = list
            }
            return {
                getList, onDrop, startDrag
            }
        }
    
    }
</script>
    
    <style>
    .wrapper {
        background-color: var(--dark-alt);
        min-height: 100vh;
    }

    .DragNdrop {
        display: flex;
        flex-wrap: nowrap;
        padding-left: 30px;

    }
    
    .drop-zone {
        width: 100%;
        margin: 50px;
        background-color: black;
        padding: 10px;
        min-height: 10px;
        text-align: center;
        border-radius: 15px;
    }
    
    .drag-el {
        background-color: red;
        color: black;
        padding: 5px;
        margin-bottom: 10px;
        border-radius: 15px;
        margin: 10px 40px;
    }
    </style>