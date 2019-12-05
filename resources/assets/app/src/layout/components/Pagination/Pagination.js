import React, {Component} from 'react';
import { connect } from 'react-redux';

import {
    Pagination as PaginationReact, 
    PaginationItem, PaginationLink
} from 'reactstrap';

import PropTypes from 'prop-types';

/**
 * The type of React {@code Component} props of {@link BlankPage}.
 */
type Props = {
    dispatch: Dispatch<*>,

    /**
     * Callback to handle click to select page
     * @param url : clieck on url
     */
    onPageClickListener : Function,

    /**
     * Current url
     */
    path : String,

    /**
     * current page
     */
    current_page : Number,

    next_page_url : String,
    prev_page_url : String,

    last_page : Number,

    per_page : Number
};


class PaginationView extends Component {

    constructor(props : Props) {
        super(props);

        console.log( this.props );
    }

    sidebarToggle(e) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-hidden');
    }

    sidebarMinimize(e) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-minimized');
    }

    mobileSidebarToggle(e) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-mobile-show');
    }

    asideToggle(e) {
        e.preventDefault();
        document.body.classList.toggle('aside-menu-hidden');
    }


    renderItems = ()=>{
        var items = [];

        // const reduceItems = [ null, null, null, "...", null, null, null];

        if( this.props.last_page === undefined ){
            return null;
        }

        const MAX_ITEMS  = 9;
        const HALF_ITEMS = Math.floor( MAX_ITEMS /2);
        let start = this.props.current_page - HALF_ITEMS
        let end   = this.props.current_page + HALF_ITEMS;

        if( start < 1 ){
            start = 1;
        }

        if( start < HALF_ITEMS ){
            end = start + MAX_ITEMS -1;
        }
        if( end > this.props.last_page ){
            end = this.props.last_page;
        }

        
        for( var i=start; i<=end; i++ ){
            items.push( {
                name : i,
                href : `${this.props.path}?page=${i}` 
            })
        }

        return (
            
                 items.map( (item, index)=> (
                    <PaginationItem key={index} active={start + index == this.props.current_page}>
                        <PaginationLink onClick={()=>this._onItemClick( item.href )}>{item.name}</PaginationLink>
                    </PaginationItem>
                ))
        )
    }

    _onItemClick = (href)=>{
        if( this.props.onPageClickListener!=null ){
            this.props.onPageClickListener( href );
        }
    }

    render() {
        return (
            <PaginationReact>
                <PaginationItem disabled={this.props.prev_page_url===null}>
                    <PaginationLink previous onClick={()=>this._onItemClick( this.props.prev_page_url )}>Prev</PaginationLink>
                </PaginationItem>
                { this.renderItems() }
                <PaginationItem disabled={this.props.next_page_url===null}>
                    <PaginationLink next onClick={()=>this._onItemClick( this.props.next_page_url )}>Next</PaginationLink>
                </PaginationItem>
            </PaginationReact>
        );
    }
}

const mapStateToProps = state => {
    const LAYOUT_STORE = 'features/layout';
    return {
        searchBarVisible : state[ LAYOUT_STORE].searchBarVisible
    }
}

export default connect(mapStateToProps)( PaginationView );
