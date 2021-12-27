class Produto {

    constructor() {
       this.id = 1;
       this.arrayProdutos = [];
       this.editId = null;
    }

    salvar() {
        let produto = this.lerDados();
        if(this.validaCampos(produto)){
            if(this.editId === null){
                this.adicionarArray(produto)  //adicionar produto no array
            } else {
                this.atualizar(this.editId, produto)
            }
            
        }

        this.listaTabela();
        this.cancelar();
        
        // console.log(produto);
    }

    listaTabela(){
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        for(let i = 0; i < this.arrayProdutos.length; i++){
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayProdutos[i].id; 
            td_produto.innerText = this.arrayProdutos[i].nomeProduto;
            td_valor.innerText = this.arrayProdutos[i].valor;
            
            td_id.classList.add('center')  //centralizando dinamicamente
            td_acoes.classList.add('center')
            
            let imgEdit = document.createElement("img");
            imgEdit.src = "img/edit.png"
            imgEdit.setAttribute("onclick", "produto.preparaEdicao("+ JSON.stringify(this.arrayProdutos[i])+")")

            let imgDelete = document.createElement("img")
            imgDelete.src = "img/delete.png"
            imgDelete.setAttribute("onclick", "produto.deletar("+ this.arrayProdutos[i].id +")") //evento, ação

            td_acoes.appendChild(imgEdit); //coloca img comofilho de td_acoes <td> <img> </td>

            td_acoes.appendChild(imgDelete);
        }
    }

    adicionarArray(produto) {
        produto.valor = parseFloat(produto.valor)
        this.arrayProdutos.push(produto); //pegando lista de produtos e jogando no array
        this.id++;
        
    }

    lerDados() {
        let produto = {}

        produto.id = this.id;
        produto.nomeProduto = document.getElementById('produto').value
        produto.valor = document.getElementById('valor').value

        return produto;
    }

    //apos leitura de dados temos q validar os campos
    validaCampos(produto) {
        let msg = '';
        
        if(produto.nomeProduto === '') {
            msg += '- Preencha o produto desejado \n'
        }

        if(produto.valor === '') {
            msg += '- Preencha o valor do produto \n'
        }

        if(msg != ''){
            alert(msg)
            return false;
        }

        return true;
    }

    cancelar() {
        document.getElementById('produto').value = ''
        document.getElementById('valor').value = ''
        document.getElementById('btn1').innerText = 'Salvar'
        this.editId = null
    }

    preparaEdicao(dados) {
        this.editId = dados.id;
        document.getElementById('produto').value = dados.nomeProduto;
        document.getElementById('valor').value = dados.valor;
        
        document.getElementById('btn1').innerText = 'Atualizar';
    }

    atualizar(id, produto) {
        for(let i = 0; i < this.arrayProdutos.length; i++) {
            if(this.arrayProdutos[i].id === id){
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].valor = produto.valor;
            }
        }
    }

    deletar(id) {
        if(confirm(`Tem certeza que deseja deletar o item ${id}?`)) {
            let tbody = document.getElementById('tbody');
        
            for(let i = 0; i < this.arrayProdutos.length; i++){
                if(this.arrayProdutos[i].id === id) {
                    this.arrayProdutos.splice(i, 1) //deletar(indice,qtd de registros) 
                    tbody.deleteRow(i)
                }
            }
        }
        
    }

}

var produto = new Produto();