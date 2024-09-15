const { select, input, checkbox } = require('@inquirer/prompts');

let mensagem = "😍 Bem Vindo(a) ao App de Metas. 📊";

let meta = {

    value: "Tomar 3 litos de água por dia",
    checked: false
    
};

let metas = [ meta ];

// Função cadastrar meta
const cadastarMeta = async () => {

    const meta = await input({message: "Digite  a meta que você deseja alcançar:"});

    if(meta.length == 0){

        mensagem = "[] A meta não pode ser vasia. ❌";
        return

    };

    metas.push({

        value: meta, 
        checked: false

    });

    mensagem = "😀 Meta cadastrada com sucesso! 👍";

};

// Função para listar metas
const listarMetas = async () => {

    const respostas = await checkbox({

        message: "Use as setas para navegar entre as opções do menu, e use o espaço para marcar ou desmarcar a opção desejada, e Enter para sair.",

        choices: [...metas],

        instructions: false

    });

    metas.forEach((m) => {

        m.checked = false;

    });

    if(respostas.length == 0) {

        mensagem = "😔 Nenhuma foi meta selecionada!👆";
        return;

    };

    respostas.forEach((resposta) => {

        const meta =  metas.find((m) => {

            return m.value == resposta;

        });

        meta.checked = true;

    });
 
    mensagem = "😀 Meta(s) marcada(s) como concluída(s) com sucesso! ✅";


};

// Função que mostra uma lista de metas realizadas.
const listarMetasRealizadas = async () => {

    const realizadas = metas.filter((meta) => {

        return meta.checked;

    });

    if(realizadas.length == 0) {

        mensagem = "😔 Não existem meta(s) realizada(s) :(";
        return;

    };

    await select({

        message: "Metas Realizadas: " +  realizadas.length,
        choices: [...realizadas]

    })

};

// Função que mostra uma lista de metas não realizadas.
const listarMetasEmAberto = async () => {

    const abertas = metas.filter((meta) => {

        return !meta.checked; // Usando o operador de inversão "!" para selecionar as metas não realizadas.

    });

    if(abertas.length == 0) {

        mensagem = "❎ Não Existe(m) meta(s) em aberto :)";
        return;

    };

    await select({

        message: "Metas em Aberto: " + abertas.length,
        choices: [...abertas]

    });

};

// Função de Deletar metas
const  deletarMeta = async (meta) => {  


    const metasDesmarcadas = metas.map((meta) => { //  Usando o método map() para criar uma nova lista com as metas desmarcadas.

        return {value: meta.value, checked: false};  // Desmarcando a meta.

    });


    const itemsADeletar = await checkbox({

        message: "👆 Selecione item para deletar.",

        choices: [...metasDesmarcadas],

        instructions: false

    });

    if (itemsADeletar.length == 0) {

        mensagem = "😣 Nenhuma meta foi selecionada para ser deletada."; 
        return

    };


    itemsADeletar.forEach((item) => {

        metas = metas.filter((meta) => {

            return meta.value != item;

        });

    });

    mensagem = "✅ A(s) meta(s) selecionada(s), foi(foram) deletada(s) com sucesso! ❌";

};

const mostrarMensagem = () => {

    console.clear();

    if(mensagem != "") {

        console.log(mensagem);
        console.log("");
        mensagem = "";

    }

};

const start = async () => { // Função que inicía a aplicação
    
    while(true) { // Estrutura de Repetição
        
        mostrarMensagem();

        const opcao = await select({ //  Função que seleciona a opção do usuário usando o prompt do pacote  @inquirer/prompts 

            message: "Menu >",  // Mensagem que é exibida ao usuário
            choices: [  // Opções que o usuário pode escolher

                {

                    name: "Cadastrar Meta", // Nome da opção
                    value: "cadastrar"   // Valor da opção

                },

                {

                    name: "Listar Metas", // Nome da opção
                    value: "listar" // Valor da opção

                },

                {

                    name: "Metas Realizadas", // Nome da opção
                    value: "realizadas" // Valor da opção

                },

                {

                    name: "Metas em Aberto", // Nome da opção
                    value: "abertas" // Valor da opção

                },

                {

                    name: "Deletar Metas", // Nome da opção
                    value: "deletar" // Valor da opção

                },

                {

                    name: "Sair", // Nome da opção
                    value: "sair" // Valor da opção

                }

            ]

        });

        switch(opcao) { //  Estrutura de Decisão / Condicional

            case "cadastrar": //   Caso em que a opção é "Cadastar"

                await cadastarMeta(); // Chamada da função cadastrarMeta
                break // Encerra o caso.

            case "listar": //  Caso em que a opção é "listar"

                await listarMetas();  // Chamada da função listarMetas
                break; // Encerra o caso

            case "realizadas":

                await listarMetasRealizadas();  // Chamada da função listarMetasRealizadas
                break; // Encerra o caso

            case "abertas":

                await listarMetasEmAberto();
                break; //  Encerra o caso

            case "deletar":
                await deletarMeta(); // Chamada da função deletarMeta
                break; // Encerra o caso.

            case "sair": // Caso em que a opção é "Sair"

                console.log("Foi um prazer te ver por aqui novamente, Até a próxima!👋");
                return //  Encerra a função.

        };

    };

};

start (); // Inicia a aplicação.

/*

    Atenção : O código assima como um exemplo de como funciona a estrutura de repetição while e a estrutura de decisão switch, nesse caso a estrutura de repetição é sempre true então ela vai sempre ser executada,
    quando os casos forem Cadastrar e listar, o programa será execultada infinitamente, para sair deixe seu terminal selecionado é de o comando <ctrl + c> para a aplicação ser encerrada, caso seja sair, a aplicação executará o laço de repetição e condo chegar no caso sair o programa irá encerrar.


*/