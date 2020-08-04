$(document).ready(function() {

    function limpa_formulário_cep() {
        $("#rua").val("");
        $("#bairro").val("");
        $("#cidade").val("");
        $("#uf").val("");
        $("#ibge").val("");
    }
    
    $("#cep").blur(function() {
    
        let cep = $(this).val().replace(/\D/g, '');
    
        if (cep != "") {
    
            var validacep = /^[0-9]{8}$/;
    
            if(validacep.test(cep)) {
    
                $("#rua").val("espera um pouquinho");
                $("#bairro").val("espera um pouquinho");
                $("#cidade").val("espera um pouquinho");
                $("#uf").val("espera um pouquinho");
                $("#ibge").val("espera um pouquinho");
    
                $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {
    
                    if (!("erro" in dados)) {
                        $("#rua").val(dados.logradouro + dados.complemento);
                        $("#bairro").val(dados.bairro);
                        $("#cidade").val(dados.localidade);
                        $("#uf").val(dados.uf);
                        $("#ibge").val(dados.ibge);
                    }
                    else {
                        limpa_formulário_cep();
                        $("#rua").val("cep não encontrado");
                        $("#bairro").val("cep não encontrado");
                        $("#cidade").val("cep não encontrado");
                        $("#uf").val("cep não encontrado");
                        $("#ibge").val("cep não encontrado");
                    }
                });
            }
            else {
                limpa_formulário_cep();
                  $("#rua").val("cep inválido");
                  $("#bairro").val("cep inválido");
                  $("#cidade").val("cep inválido");
                  $("#uf").val("cep inválido");
                  $("#ibge").val("cep inválido");
            }
        }
        else {
            limpa_formulário_cep();
        }
    });
});