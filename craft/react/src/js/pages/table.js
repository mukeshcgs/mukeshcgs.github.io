import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom"
import ReactDOM from "react-dom"

import $ from "jquery"
import DataTable from 'datatables.net';

class Table extends Component {

    componentDidMount() {
        const columns = [{
                title: 'Name',
                width: 120,
                data: 'name'
            },
            {
                title: 'Nickname',
                width: 180,
                data: 'nickname'
            },
        ];

        const names = [{ "name": 'Mukesh', "nickname": 'Mukoond' }, { "name": 'Rakesh', "nickname": 'Singer' }];

        $(this.refs.main).DataTable({
            dom: '<"data-table-wrapper"t>',
            data: [
            { "name": 'Mukesh', "nickname": 'Mukoond' }, 
            { "name": 'Rakesh', "nickname": 'Singer' }, 
            { "name": 'Mukesh', "nickname": 'Mukoond' }, 
            { "name": 'Rakesh', "nickname": 'Singer' }, 
            { "name": 'Mukesh', "nickname": 'Mukoond' }, 
            { "name": 'Rakesh', "nickname": 'Singer' }, 
            { "name": 'Mukesh', "nickname": 'Mukoond' }, 
            { "name": 'Rakesh', "nickname": 'Singer' }, 
            { "name": 'Mukesh', "nickname": 'Mukoond' }, 
            { "name": 'Rakesh', "nickname": 'Singer' }, 
            { "name": 'Mukesh', "nickname": 'Mukoond' }, 
            { "name": 'Rakesh', "nickname": 'Singer' }, 
            { "name": 'Mukesh', "nickname": 'Mukoond' }, 
            { "name": 'Rakesh', "nickname": 'Singer' }, 
            { "name": 'Mukesh', "nickname": 'Mukoond' }, 
            { "name": 'Rakesh', "nickname": 'Singer' }, 
            { "name": 'Mukesh', "nickname": 'Mukoond' }, 
            { "name": 'Rakesh', "nickname": 'Singer' }, 
            { "name": 'Mukesh', "nickname": 'Mukoond' }, 
            { "name": 'Rakesh', "nickname": 'Singer' }, 
            { "name": 'Mukesh', "nickname": 'Mukoond' }, 
            { "name": 'Rakesh', "nickname": 'Singer' }, 
            { "name": 'Mukesh', "nickname": 'Mukoond' }, 
            { "name": 'Rakesh', "nickname": 'Singer' }, 
            { "name": 'Mukesh', "nickname": 'Mukoond' }, 
            { "name": 'Rakesh', "nickname": 'Singer' }, 
            { "name": 'Mukesh', "nickname": 'Mukoond' }, 
            { "name": 'Rakesh', "nickname": 'Singer' }, 
            { "name": 'Geetesh', "nickname": '0.2' }],
            columns,
            ordering: true,
            scrollY: 200,
            paging: true,
            "pagingType": "full_numbers"
        });
    }

    componentWillUnmount() {

        $('.data-table-wrapper')
            .find('table')
            .DataTable({ ordering: true,
            scrollY: 200,
            paging: true,
            "pagingType": "full_numbers"})
            .destroy(true);
    }
    shouldComponentUpdate(nextProps) {
        if (nextProps.names.length !== this.props.names.length) {

            console.log(this.props.names);

            reloadTableData(nextProps.names);
        } else {
            updateTable(nextProps.names);
        }
        return false;
    }
    reloadTableData(names) {
        const table = $('.data-table-wrapper')
            .find('table')
            .DataTable({ordering: true,
            scrollY: 200,
            paging: true,
            "pagingType": "full_numbers"});
        table.clear();
        table.rows.add(names);
        table.draw();
    }


    updateTable(names) {
        const table = $('.data-table-wrapper')
            .find('table')
            .DataTable({ordering: true,
            scrollY: 200,
            paging: true,
            "pagingType": "full_numbers"});

        let dataChanged = false;

        table.rows().every(function() {
            const oldNameData = this.data();
            const newNameData = names.find((nameData) => {
                return nameData.name === oldNameData.name;
            });
            if (oldNameData.nickname !== newNameData.nickname) {
                dataChanged = true;
                this.data(newNameData);
            }
            return true; // RCA esLint configuration wants us to 
            // return something
        });

        if (dataChanged) {
            table.draw();
        }
    }
    render() {

        return ( <div>
          <table ref = "main"/>
          </div>);
        }
    }

    export default Table;