<template>
	<div class="container">
	  <h2 class="header">{{ question }}</h2>
	  <textarea class="textarea" v-model="answer"></textarea>
	  <button class="submit-button" @click="submitAnswer">Submit</button>
	</div>
  </template>
  <style scoped>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #f2f2f2;
		padding: 20px;
	}
	
	.header {
		margin-bottom: 20px;
		font-size: 22px;
		color: #333;
	}
	
	.textarea {
		width: 500px;
		height: 200px;
		margin-bottom: 20px;
		resize: none;
		background-color: #fff;
		border: 1px solid #333;
		padding: 10px;
		font-size: 16px;
		color: #333;
	}
	
	.submit-button {
		background-color: #333;
		color: #fff;
		font-size: 18px;
		padding: 10px 20px;
		border: none;
		cursor: pointer;
	}
  </style>
  <script>
  import axios from 'axios'
  
  export default {
	data() {
	  return {
		question: 'What is your favorite color?',
		answer: ''
	  }
	},
	methods: {
	  async submitAnswer() {
		// Prepare the answer to be sent to the database
		const data = {
		  question: this.question,
		  answer: this.answer
		}
  
		try {
		  // Send the answer to the database using Axios
		  await axios.post('/api/Student-long-answers', data)
		  console.log('Answer submitted successfully!')
		} catch (error) {
		  console.error('Error submitting answer:', error)
		}
	  }
	}
  }
  </script>