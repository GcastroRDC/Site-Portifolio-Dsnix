let btnMenu = document.getElementById('btn-menu')
let menu = document.getElementById('menu-mobile')
let overlay = document.getElementById('overlay-menu')

btnMenu.addEventListener('click', ()=>{
    menu.classList.add('abrir-menu')
})

menu.addEventListener('click', ()=>{
    menu.classList.remove('abrir-menu')
})

overlay.addEventListener('click', ()=>{
    menu.classList.remove('abrir-menu')
})


window.addEventListener('DOMContentLoaded', event => {

  
  const sideNav = document.body.querySelector('#sideNav');
  if (sideNav) {
      new bootstrap.ScrollSpy(document.body, {
          target: '#sideNav',
          rootMargin: '0px 0px -40%',
      });
  };


  const navbarToggler = document.body.querySelector('.navbar-toggler');
  const responsiveNavItems = [].slice.call(
      document.querySelectorAll('#navbarResponsive .nav-link')
  );
  responsiveNavItems.map(function (responsiveNavItem) {
      responsiveNavItem.addEventListener('click', () => {
          if (window.getComputedStyle(navbarToggler).display !== 'none') {
              navbarToggler.click();
          }
      });
  });

});


/*Eventos dos Pop Up dos projetos*/
document.addEventListener('DOMContentLoaded', function() {
  var popup = document.getElementById('projeto-popup');
  var imagemProjeto = document.getElementById('imagem-projeto');
  var fecharPopup = document.getElementById('fechar-popup');
  var anteriorBtn = document.getElementById('anterior');
  var proximoBtn = document.getElementById('proximo');

  var imagensDoProjeto = [];
  var indiceAtual = 0;

  // Função para abrir o popup com as imagens do projeto
  function abrirPopup(imagens) {
      imagensDoProjeto = imagens;
      mostrarImagem(indiceAtual);
      popup.style.display = 'block';
      atualizarControles();
  }

  // Função para mostrar uma imagem específica
  function mostrarImagem(indice) {
      imagemProjeto.innerHTML = '<img src="' + imagensDoProjeto[indice] + '" alt="Imagem do projeto">';
      indiceAtual = indice;
      atualizarControles();
  }

  // Função para atualizar os controles de navegação
  function atualizarControles() {
      if (imagensDoProjeto.length <= 1) {
          anteriorBtn.style.display = 'none';
          proximoBtn.style.display = 'none';
          return; // Não há necessidade de continuar se não houver navegação possível
      }

      if (indiceAtual === 0) {
          anteriorBtn.style.display = 'none'; // Esconde o botão anterior no primeiro índice
      } else {
          anteriorBtn.style.display = 'block';
      }

      if (indiceAtual === imagensDoProjeto.length - 1) {
          proximoBtn.style.display = 'none'; // Esconde o botão próximo no último índice
      } else {
          proximoBtn.style.display = 'block';
      }
  }

  // Fechar o popup ao clicar no botão de fechar
  fecharPopup.addEventListener('click', function() {
      popup.style.display = 'none';
  });

  // Evento de clique no botão anterior
  anteriorBtn.addEventListener('click', function() {
      if (indiceAtual > 0) {
          mostrarImagem(indiceAtual - 1);
      }
  });

  // Evento de clique no botão próximo
  proximoBtn.addEventListener('click', function() {
      if (indiceAtual < imagensDoProjeto.length - 1) {
          mostrarImagem(indiceAtual + 1);
      }
  });

  // Evento para abrir o popup ao clicar nos links de projeto
  var linksProjetos = document.querySelectorAll('.smenu a');
  linksProjetos.forEach(function(link) {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          var projetoSelecionado = this.getAttribute('data-projeto');
          var caminhoImagens = ['imagens/' + projetoSelecionado + '.png'];

          // Verifica se existe uma segunda imagem e adiciona ao array
          var segundaImagem = 'imagens/' + projetoSelecionado + '-1.png';
          if (segundaImagemExiste(segundaImagem)) {
              caminhoImagens.push(segundaImagem);
          }

          abrirPopup(caminhoImagens);
      });
  });

  // Função auxiliar para verificar se a segunda imagem existe
  function segundaImagemExiste(caminho) {
      var img = new Image();
      img.src = caminho;
      return img.complete || (img.width + img.height) > 0;
  }
});


document.querySelectorAll('.smenu a').forEach(item => {
    item.addEventListener('click', function(event) {
        event.preventDefault(); // Previne o comportamento padrão do link

        // Captura os dados do projeto
        const titulo = this.getAttribute('title');
        const videoUrl = `videos/${this.getAttribute('data-projeto')}.mp4`; // Supondo que os vídeos estejam em uma pasta chamada 'videos'
        const videoTitle = `${this.getAttribute('data-projeto')}`; 
        const descricao = `Descrição do projeto: ${titulo}`; // Aqui você pode modificar a descrição conforme necessário

        // Preenche o modal com os dados do projeto
        document.getElementById('titulo-projeto').innerText = videoTitle;
        document.getElementById('videoSource').src = videoUrl;
        document.getElementById('video-projeto').load();
        document.getElementById('descricao-projeto').innerText = descricao;

        // Mostra o modal
        document.getElementById('modal').style.display = 'block';
    });
});

// Fecha o modal quando o usuário clica no "x"
document.querySelector('.close').onclick = function() {
    document.getElementById('modal').style.display = 'none';
}

// Fecha o modal quando o usuário clica fora do conteúdo
window.onclick = function(event) {
    if (event.target === document.getElementById('modal')) {
        document.getElementById('modal').style.display = 'none';
    }
}


