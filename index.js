const API_SECRET = 'YOUR_API_SECRET';

function sendQuestion() {
    const question = document.getElementById('question-message');
    const status = document.getElementById('status');
    const btnSubmit = document.getElementById('btn-submit');
    const chatBox = document.querySelector('#chat-box');
    if (!question.value) {
        alert('Digite uma pergunta!')
        return;
    }
    status.style.display = 'block'
    btnSubmit.disabled = true
    btnSubmit.style.cursor = 'not-allowed'
    question.disabled = true
    chatBox.style.display = ''



    fetch("https://api.openai.com/v1/completions",{
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_SECRET}`,
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: question.value,
            max_tokens: 2048, // tamanho da resposta
            temperature: 0.5 // criatividade na resposta
        })
    })
    .then((response) => response.json())
    .then((response) => {
        let anyswer = response.choices[0]['text']
        status.style.display = 'none'

        
        const textElement = document.createElement('p');
        textElement.textContent = question.value;
        textElement.classList.add('question-text');
        chatBox.appendChild(textElement);
        const anyswerElement = document.createElement('p');
        anyswerElement.textContent = anyswer;
        anyswerElement.classList.add('anyswer-text');
        chatBox.appendChild(anyswerElement);
        chatBox.scrollTop = chatBox.scrollHeight

    })
    .catch((e) => {
        console.log(`Error -> ${e}`)
        const errorText = document.createElement('p');
        errorText.textContent = 'Erro ao enviar pergunta, tente novamente mais tarde!';
        const statusElement = document.getElementById('status');
        if (statusElement) {
            statusElement.appendChild(errorText);
        } else {
            console.error('Element with ID "status" not found.');
        }
    })
    .finally(() => {
        btnSubmit.disabled = false
        btnSubmit.style.cursor = 'pointer'
        question.disabled = false
        question.value = ''
 
    })
  


}

