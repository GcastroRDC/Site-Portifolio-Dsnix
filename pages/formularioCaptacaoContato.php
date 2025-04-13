<?php
session_start(); // Inicia a sessão

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Coleta os dados do formulário
    $tipoFormulario = $_POST["tipoFormulario"];
    $nome = $_POST["nome"];
    $telefone = $_POST["telefone"];
    $email = $_POST["email"];
    $tiposServico = $_POST["tiposServicos"];
    $assuntoContato = $_POST["assuntoContato"];
    $mensagemContato = $_POST["mensagemContato"];
    
    // Gerar um código único
    $codigoSolicitacao = uniqid(); // Gera um ID único baseado no timestamp
    
    $to = "dsnixagenciadigital@gmail.com"; // Email para Contato
    $subject = "SOLICITAÇÃO DE CONTATO - $assuntoContato";

    // Corpo do e-mail de contato
    $body = "CÓDIGO DO CONTATO: #$codigoSolicitacao\nNOME: $nome\nTELEFONE: $telefone\nE-MAIL: $email\nTIPO(S) DE SERVIÇO: $tiposServico\n";
    $body .= "ASSUNTO: $assuntoContato\n";
    $body .= "MENSAGEM: " . htmlentities($mensagemContato, ENT_QUOTES, 'UTF-8');

    // Cabeçalhos adicionais
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Envia o e-mail para contato@dsnix.com.br
    if (mail($to,$subject, $body, $headers)) {
        // Email para o cliente
        $subjectCliente = "Solicitação de Contato - $assuntoContato";
        $bodyCliente = "Prezado(a) $nome,\n\nAgradecemos por entrar em contato conosco. Em breve, entraremos em contato com você para maiores detalhes sobre nossos serviços e esclarecimento de todas as suas dúvidas.\n\nO Código do Contato: #$codigoSolicitacao\n\nAtenciosamente,\nGabriel Castro Mateus | DSNIX";

        $headersCliente = "From: dsnixagenciadigital@gmail.com\r\n";
        $headersCliente .= "Content-Type: text/plain; charset=UTF-8\r\n";

        if(mail($email, $subjectCliente, $bodyCliente, $headersCliente)){
            
           // Resposta de sucesso para o JavaScript
            $response = array(
               'success' => true
             
               );
               
        } else {
        // Resposta de erro para o JavaScript
        $response = array(
            'success' => false,
            'message' => "Falha na Resposta"
          );
        }
    

    } else {
        // Resposta de erro para o JavaScript
        $response = array(
            'success' => false,
            'message' => "Falha no recebimento"
        );
    }
    
    // Retorna a resposta em JSON
    header('Content-Type: application/json');
    echo json_encode($response);
    
} else {
    // Se o método de requisição não for POST, redireciona para a página do formulário
    exit;
}

?>
