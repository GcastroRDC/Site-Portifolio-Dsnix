document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('formularioCaptacaoContato').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        var email = document.getElementById('email').value;
        var telefone = document.getElementById('telefone').value;

        // Expressão regular para validar e-mail
        var regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        // Expressão regular para validar telefone (padrão DD XXXXX-XXXX)
        var regexTelefone = /^\(\d{2}\) \d{5}-\d{4}$/;

        // Verifica se o e-mail está no formato correto
        if (!regexEmail.test(email)) {
            alert('Por favor, informe um e-mail válido.');
            return false; // Impede o envio do formulário
        }

        // Verifica se o telefone está no formato correto
        if (telefone !== '' && !regexTelefone.test(telefone)) {
            alert('Por favor, informe um telefone válido no formato (DD) XXXXX-XXXX');
            return false; // Impede o envio do formulário
        }

        // Se os campos de email e telefone estiverem válidos, prosseguir com o envio via fetch
        var formData = new FormData(this); // 'this' refere-se ao formulário atual

        fetch('formularioCaptacaoContato.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao enviar os dados');
            }
            return response.json(); // Retorna a resposta como JSON
        })
        .then(data => {
            // Se 'success' = true
            if (data.success) {
                // Mostra o círculo de progresso
                document.getElementById('loaderContainer').style.display = 'block';

                // Simula o tempo de envio do círculo de progresso
                setTimeout(function() {
                    // Esconde o círculo de progresso
                    document.getElementById('loaderContainer').style.display = 'none';

                    // Mostra o popup de sucesso
                    document.getElementById('popup').style.display = 'block';
                    document.getElementById('overlay').style.display = 'block';

                }, 2000); // Tempo de simulação de envio (2 segundos)

                // Fecha o popup quando o botão Fechar é clicado
                document.getElementById('closeBtn').addEventListener('click', function() {
                    document.getElementById('popup').style.display = 'none';
                    document.getElementById('overlay').style.display = 'none';
                });

                document.getElementById('formularioCaptacaoContato').reset(); // Limpa o formulário

            } else { // Se 'success' = false

                // Mostra o círculo de progresso
                document.getElementById('loaderContainer').style.display = 'block';

                // Simula o tempo de envio do círculo de progresso
                setTimeout(function() {
                    // Esconde o círculo de progresso
                    document.getElementById('loaderContainer').style.display = 'none';

                    // Mostra o popup de erro
                    document.getElementById('popupErro').style.display = 'block';
                    document.getElementById('overlay').style.display = 'block';

                }, 2000); // Tempo de simulação de envio (2 segundos)

                // Fecha o popup quando o botão Fechar é clicado
                document.getElementById('closeBtnErro').addEventListener('click', function() {
                    document.getElementById('popupErro').style.display = 'none';
                    document.getElementById('overlay').style.display = 'none';
                });

                document.getElementById('formularioCaptacaoContato').reset(); // Limpa o formulário
            }
        })
        .catch(error => {
            console.error('Erro durante o fetch:', error);
            alert('Erro ao enviar o formulário. Por favor, tente novamente!');
        });
    });
});
