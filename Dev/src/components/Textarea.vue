<template>
    <div class="app3">
        <h2>Question 2:</h2>
        <textarea rows="5" cols="100" class="textarea" v-model="message" placeholder="Tapez votre réponse..."></textarea>
        <button class="BtnSubmit">Confirmer</button>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
.textarea {
    padding: 0.5rem;
    border-radius: 10px;
	margin-bottom: 1rem;
}

.app3 {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 2rem;
	height: 100vh;
    width: 100%;
    border-radius: 0.5rem;
    background-color: var(--dark-alt);
}

h1, h2{
    color: var(--light);
	font-size: 2rem;
	margin-bottom: 2rem;
}

.BtnSubmit {
    appearance: none;
	outline: none;
	border: none;
	cursor: pointer;
	padding: 0.5rem 1rem;
	background-color: var(--primary);
	color: var(--dark);
	font-weight: 700;
	text-transform: uppercase;
	font-size: 1.2rem;
	border-radius: 0.5rem;
}


</style>
