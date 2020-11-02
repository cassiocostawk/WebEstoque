import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class FetchEstoques extends Component {
    constructor(props) {
        super(props);
        this.state = { estoques:[], loading:true }
    }

    componentDidMount() {
        this.populateEstoquesData();
    }

    async populateEstoquesData() {
        const response = await fetch("api/tbestoques");
        const data = await response.json();

        this.setState({ estoques: data, loading: false })
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Carregando...</em></p>
            : this.renderEstoquesTable(this.state.estoques);
        return (
            <div>
                <p>
                    <Link to="/addestoque">Inserir um Produto ao Estoque</Link>
                </p>
                {contents}
            </div>
        );
    }

    renderEstoquesTable(estoques) {
        return (
            <table className="table table-striped" aria-labelledby="tableLable">
                <thead>
                    <tr>
                        <th></th>
                        <th>Id</th>
                        <th>Nome do Produto</th>
                        <th>Quantidade</th>
                        <th>Valor Unitário</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {estoques.map(estoque =>
                        <tr key={estoque.id}>
                            <td></td>
                            <td>{estoque.id}</td>
                            <td>{estoque.nomeProduto}</td>
                            <td>{estoque.quantidade}</td>
                            <td>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(estoque.valorUnitario)}</td>
                            <td>
                                <button className="btn btn-success" onClick={(Id) => this.handleEdit(estoque.id)}>Editar</button>&nbsp;
                                <button className="btn btn-danger" onClick={(Id) => this.handleDelete(estoque.id)}>Remover</button>&nbsp;
                            </td>
                        </tr>    
                    )}                       
                </tbody>
            </table>
        );

    }

    handleEdit(id) {
        this.props.history.push("/estoques/edit/" + id);
    }

    handleDelete(id) {
        if (!window.confirm("Deseja remover o Produto " + id + " do Estoque?")) {
            return;
        }
        else {
            fetch('api/tbestoques/' + id, { method: 'delete' })
                .then(data => {
                    this.setState({
                        data: this.state.estoques.filter((rec) => {
                            return rec.Id != id;
                        })
                    })
                });
        }
    }
}

