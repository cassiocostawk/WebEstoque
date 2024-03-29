﻿import React, { Component } from 'react';

export class Estoque {
    constructor() {
        this.id = 0;
        this.nomeProduto = "";
        this.quantidade = 1.00;
        this.valorUnitario = 0.00;
    }
}

export class AddEstoque extends Component {
    constructor(props) {
        super(props);

        this.state = { title: "", estoque: new Estoque, loading: true };

        this.initialize();

        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    async initialize() {
        var id = this.props.match.params["id"];

        if (id > 0) {
            const response = await fetch('api/tbestoques/' + id);
            const data = await response.json();
            this.setState({ title: "Alterar", estoque: data, loading: false });
        }
        else {
            this.state = { title: "Inserir", estoque: new Estoque, loading: false };
        }

    }

    render() {
        let contents = this.state.loading
            ? <p><em>Carregando...</em></p>
            : this.renderCreateForm();
        return (
            < div >
                <h3 class="alert alert-light">{this.state.title}</h3>
                {contents}
            </div >
        );
    }

    async handleSave(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        if (this.state.estoque.id) {
            var response1 = await fetch('api/tbestoques/' + this.state.estoque.id, { method: 'PUT', body: data });
            this.props.history.push("/");
        }
        else {
            var response2 = await fetch('api/tbestoques', { method: 'POST', body: data });
            this.props.history.push("/");
        }
    }

    handleCancel(event) {
        event.preventDefault();
        this.props.history.push("/fetch-estoques");
    }


    renderCreateForm() {
        return (
            <form onSubmit={this.handleSave}>
                <div className="form-group row">
                    <input type="hidden" name="Id" value={this.state.estoque.id} />
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="NomeProduto">Nome do Produto</label>
                    <div className="col-md-4">
                        <input type="text" name="nomeProduto" defaultValue={this.state.estoque.nomeProduto} className="form-control" required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Quantidade">Quantidade</label>
                    <div className="col-md-4">
                        <input type="number" name="quantidade" defaultValue={this.state.estoque.quantidade} className="form-control" required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="ValorUnitario">Valor Unitário</label>
                    <div className="col-md-4">
                        <input name="valorUnitario" type="numeric" defaultValue={this.state.estoque.valorUnitario.toLocaleString('pt-BR')} className="form-control" required />
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Salvar</button>&nbsp;
                    <button className="btn btn-danger" onClick={this.handleCancel}>Cancelar</button>
                </div>
            </form>
        );
    }
}


