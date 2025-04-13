<?php
session_start(); // Inicia a sessão
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Coleta os dados do formulário
    $tipoFormulario = $_POST["tipoFormulario"];
    $nome = $_POST["nome"];
    $telefone = $_POST["telefone"];
    $email = $_POST["email"];
    $tiposServico = $_POST["tiposServicos"];
    $assuntoSolicitacao = $_POST["assuntoSolicitacao"];
    $mensagemSolicitacao = $_POST["mensagemSolicitacao"];
    
    // Gerar um código único
    $codigoSolicitacao = uniqid(); // Gera um ID único baseado no timestamp
    
   
    $to = "dsnixagenciadigital@gmail.com"; // Email para propostas comercial
    $subject = "SOLICITAÇÃO DE PROPOSTA - $assuntoSolicitacao";

    // Corpo do e-mail
    $body = "CÓDIGO: #$codigoSolicitacao\nNOME: $nome\nTELEFONE: $telefone\nE-MAIL: $email\nTIPO(S) DE SERVIÇO: $tiposServico\n";
    $body .= "ASSUNTO: $assuntoSolicitacao\n";
    $body .= "MENSAGEM: " . htmlentities($mensagemSolicitacao, ENT_QUOTES, 'UTF-8');

    // Cabeçalhos adicionais
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Envia o e-mail para o seu endereço
    if (mail($to,$subject, $body, $headers)) {
        // Email para o cliente
        $subjectCliente = "Solicitação de Proposta Comercial - $assuntoSolicitacao";
        $bodyCliente = "Prezado(a) $nome,\n\nAgradecemos por entrar em contato conosco. Recebemos sua solicitação de proposta e já estamos analisando todas as informações encaminhadas. Entraremos em contato em breve com você para entendimento da proposta e levantamento de requisitos.\n\nO Código da Proposta: #$codigoSolicitacao\n\nAtenciosamente,\nGabriel Castro Mateus | DSNIX";

        $headersCliente = "From: dsnixagenciadigital@gmail.com\r\n";
        $headersCliente .= "Content-Type: text/plain; charset=UTF-8\r\n";

        if(mail($email, $subjectCliente, $bodyCliente, $headersCliente)){
            
           // Resposta de sucesso de resposta
            $response = array(
               'success' => true
             
               );
               
        } else {
        // Resposta de erro da resposta
        $response = array(
            'success' => false,
            'message' => "Falha na Resposta"
          );
        }
    
    } else {
         $response = array(
            'success' => false,
             'message' => "Falha na Solicitacao"
     
           
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
