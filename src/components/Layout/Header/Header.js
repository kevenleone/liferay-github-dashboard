import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { InputGroup, Input } from 'reactstrap';
import AutoComplete from '../../AutoComplete';
import './Header.scss';

let inputTimeOut = 0;

const Header = () => {
  const { repositories, repository: { repo } } = useSelector((state) => state.github);
  const [repository, setRepository] = useState(repo);
  const dispatch = useDispatch();

  function handleClickRepository({ name }, clearValue = false) {
    setRepository(name);
    dispatch({ type: 'SET_REPOSITORY_OWNER_REPO', payload: clearValue ? '' : name });
  }

  function handleChange({ target: { name, value } }) {
    if (name === 'repository') {
      handleClickRepository({ name: value }, true);
    } else {
      // obs: This setTimeOut is used to prevent many requests while user is typing
      if (inputTimeOut) clearTimeout(inputTimeOut);
      inputTimeOut = setTimeout(() => {
        if (value && value.length >= 2) {
          dispatch({ type: 'FETCH_USER_REPOS_SAGA', payload: value });
        }
      }, 500);
    }
  }

  return (
    <div className="Header">
      <div className="heading">
        <InputGroup>
          <Input
            onChange={handleChange}
            className="custom-input"
            placeholder="Liferay"
            name="username"
          />
        </InputGroup>
        <AutoComplete
          onClickItem={handleClickRepository}
          onChange={handleChange}
          itemSelected={repo}
          data={repositories}
          value={repository}
          name="repository"
        />
      </div>
    </div>
  );
};

export default Header;
