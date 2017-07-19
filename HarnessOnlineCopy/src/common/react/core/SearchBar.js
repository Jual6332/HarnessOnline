import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import Magnify from './Svgs/Magnify';
import MenuDown from './Svgs/MenuDown';
import TextInput from './TextInput';
import TypeAhead from './TypeAhead';
import {
  $PrimaryColor
} from './Variables';
import {openModal, closeModal} from '../../redux/App';
import {setInput} from '../../redux/Search';
import buildRequest from '../../utilities/buildRequest';
import clientUrlUtil from '../../utilities/clientUrl';
import {MODAL_SEARCH, searchCategories} from '../../utilities/constants';
import {bindMethods} from '../../utilities/reactHelpers';

const clientUrl = clientUrlUtil();
const $Background = '#EAEAE6';

const Div = styled.div`
  padding: 0 10px;
`;

const MagnifyWrap = styled.div`
  display: inline-block;
  position: absolute;
  left: 0;
  margin-left: 20px;
  margin-top: 14px;

  svg {
    cursor: pointer;
    fill: ${$PrimaryColor};
    height: 25px;
    width: 25px;
  }
`;

const MenuWrap = styled.div`
  display: inline-block;
  position: absolute;
  right: 0;
  margin-right: 20px;
  margin-top: 10px;
  height: 30px;
  width: 30px;

  svg {
    fill: #ABB3B1;
  }
`;

const Search = styled(TextInput)`
  display: inline-block;
  width: 69%;
  height: 50px;
  margin-right: 1%;
  padding: 10px 10px 10px 40px;
  vertical-align: top;
  box-sizing: border-box;
  background: ${$Background};
  border: none;
  font-weight: 300;
  font-size: 20px;
  color: #797575;
`;

const Select = styled.select`
  display: inline-block;
  width: 30%;
  height: 50px;
  padding: 10px;
  box-sizing: border-box;
  border: 0;
  border-radius: 0;
  appearance: none;
  cursor: pointer;
  background: ${$Background};
  font-weight: 300;
  font-size: 20px;
  color: #797575;
`;

class SearchBar extends Component {
  static propTypes = {
    displayModal: PropTypes.bool,
    handleInput: PropTypes.func,
    handleModalClose: PropTypes.func,
    handleModalOpen: PropTypes.func,
    input: PropTypes.object,
    modelType: PropTypes.string
  }

  constructor (props) {
    super(props);

    this.state = {
      category: '',
      query: ''
    };

    bindMethods(this, [
      'handleInputChange',
      'handleResultClick',
      'handleSelectChange',
      'handleSubmit'
    ]);
  }

  // TODO: redux set state on load
  // componentDidMount () {
  //   if (location) {
  //     const parseQString = queryString.parse(location.search);
  //
  //     // eslint-disable-next-line react/no-did-mount-set-state
  //     this.setState({...this.state, ...parseQString});
  //   }
  // }

  handleInputChange (value, key) {
    if (value) {
      this.props.handleModalOpen(MODAL_SEARCH);
    } else {
      this.props.handleModalClose();
    }

    this.props.handleInput([key], value);
  }

  handleResultClick () {
    this.props.handleModalClose();
    this.props.handleInput('query', '');
  }

  handleSelectChange (ev) {
    this.props.handleInput('category', ev.target.value);
  }

  handleSubmit (ev) {
    ev.preventDefault();

    const {category = '', query = ''} = this.props.input || {};
    const splitClient = clientUrl.split('/').splice(1);
    let path = [];

    if (splitClient.length > 0) {
      path = path.concat(splitClient);
    }

    const {url} = buildRequest({
      protocol: '',
      hostname: '',
      path: [...path, 'search'],
      query: {category, query}
    });

    if (location) {
      location.assign(url);
    }
  }

  render () {
    const {displayModal, input, modelType} = this.props;
    const {category, query} = input;
    const loading = false;

    return (
      <Div>
        <form onSubmit={this.handleSubmit}>
          <MagnifyWrap onClick={this.handleSubmit}><Magnify/></MagnifyWrap>
          <Search
            disabled={loading}
            handleChange={this.handleInputChange}
            placeholder='Search'
            targetKey='query'
            value={query}
          />
          <MenuWrap><MenuDown/></MenuWrap>
          <Select value={category} onChange={this.handleSelectChange}>
            <option defaultValue value=''>Search By</option>
            { searchCategories.map(searchCategory => {
              return (
                <option
                  key={searchCategory.value}
                  value={searchCategory.value}
                >{searchCategory.label}</option>
              );
            }) }
          </Select>
        </form>
        { displayModal
          && modelType === MODAL_SEARCH
          && query
          && (
          <TypeAhead
            category={category}
            handleResultClick={this.handleResultClick}
            query={query}
          />
        ) }
      </Div>
    );
  }
}

const mapStateToProps = state => {
  const {AppStore, SearchStore} = state;
  const {displayModal, modelType} = AppStore;
  const {input} = SearchStore;

  return {displayModal, input, modelType};
};

const mapDispatchToProps = dispatch => {
  return {
    handleInput: (category, value) => {
      dispatch(setInput(category, value));
    },
    handleModalClose: () => {
      dispatch(closeModal());
    },
    handleModalOpen: type => {
      dispatch(openModal(type));
    }
  };
};

const ConnectedSearchBar = connect(mapStateToProps, mapDispatchToProps)(SearchBar);

export default ConnectedSearchBar;
