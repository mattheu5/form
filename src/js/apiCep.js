$(document).ready(function() {

    $("#rua").css("display", "none");
    $("#rua1").css("display", "none");
    $("#bairro").css("display", "none");
    $("#bairro1").css("display", "none");
    $("#cidade").css("display", "none");
    $("#cidade1").css("display", "none");
    $("#uf").css("display", "none");
    $("#uf1").css("display", "none");

    function limpa_formulário_cep() {
        $("#rua").val("");
        $("#bairro").val("");
        $("#cidade").val("");
        $("#uf").val("");
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
    
                $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {
    
                    if (!("erro" in dados)) {
                        $("#rua").val(dados.logradouro + dados.complemento).css("display", "block");
                        $("#bairro").val(dados.bairro).css("display", "block");
                        $("#cidade").val(dados.localidade).css("display", "block");
                        $("#uf").val(dados.uf).css("display", "block");
                    }
                    else {
                        limpa_formulário_cep();
                        $("#rua").val("Cep não encontrado").setinterval(css("display", "block"));
                        $("#bairro").val("Cep não encontrado").css("display", "block");
                        $("#cidade").val("Cep não encontrado").css("display", "block");
                        $("#uf").val("Cep não encontrado").css("display", "block");
                    }
                });
            }
            else {
                limpa_formulário_cep();
                  $("#rua").val("Cep inválido").css("display", "block");
                  $("#bairro").val("Cep inválido").css("display", "block");
                  $("#cidade").val("Cep inválido").css("display", "block");
                  $("#uf").val("Cep inválido").css("display", "block");
            }
        }
        else {
            limpa_formulário_cep();
        }
    });
});